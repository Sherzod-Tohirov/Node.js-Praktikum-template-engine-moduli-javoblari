const { Router } = require("express");
const {
  readDataFromDbAsJSON,
  writeDataToDb,
  storeTodosToDb,
} = require("../helper/utils");
const router = new Router();

const todos = readDataFromDbAsJSON();

router.get("/", (_, res) => {
  res.render("home", {
    title: "Home page",
    todos,
  });
});

router.get("/task/new", (_, res) => {
  res.render("add-todo", {
    title: "Add new todo",
  });
});

router.post("/task", (req, res) => {
  const title = req.body.todo_title;
  const desc = req.body.todo_desc;
  try {
    writeDataToDb({ title, desc });
    res.redirect("/");
  } catch (err) {
    console.log("Error while writing to the db: ", err);
    res.status(400).json({
      error: true,
      message: "Server xatosi !",
    });
  }
  if (!title || !desc) {
    res.status(400).json({
      error: true,
      message: "Berilgan ma'lumotlar to'g'riligini tekshiring !",
    });
  }
});

router.post("/task/:id/update", (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      error: true,
      message: "Iltimos tahrirlash uchun vazifa idisini yuboring !",
    });
  }

  const todoId = req.params.id;
  const foundTodo = todos.find((todo) => todo.id === todoId);
  if (!foundTodo) {
    res.status(400).send({
      error: true,
      status: 400,
      message: "Bu idga tegishli vazifa topilmadi !",
    });
  }
  //  Update status only
  if (Object.keys(req.body).length === 1 && req.body.completed !== undefined) {
    foundTodo.completed = req.body.completed;
    console.log("found todo: ", foundTodo);
    storeTodosToDb(todos);
    res.status(200).send({
      success: true,
      status: 200,
      data: foundTodo,
      message: "Muvaffaqiyatli o'zgartirildi !",
    });
  }
  if (!req.body.todo_title || !req.body.todo_desc) {
    res.status(400).json({
      error: true,
      message: "Malumotlar to'liq kiritilmagan !",
      status: 400,
    });
  }
  //  Update whole object
  foundTodo.title = req.body.todo_title;
  foundTodo.desc = req.body.todo_desc;
  res.redirect("/");
});

router.delete("/task/:id/delete", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      error: true,
      status: 400,
      message: "Iltimos idni yuboring !",
    });
  }

  const foundTodoIndex = todos.findIndex((todo) => todo.id === id);
  if (foundTodoIndex === -1) {
    res.status(404).send({
      message: "Not found !",
      status: 404,
    });
  }

  todos.splice(foundTodoIndex, 1);
  storeTodosToDb(todos);
  res.status(200).send({
    success: true,
    status: 200,
    message: "Muvaffaqiyatli o'chirildi !",
  });
});
module.exports = router;
