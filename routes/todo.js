const { Router } = require("express");
const { readDataFromDbAsJSON } = require("../helper/utils");
const router = new Router();

const todos = readDataFromDbAsJSON();

router.get("/", (_, res) => {
  res.render("home", {
     title: "Home page",
     todos
  });
});

router.get("/task/new", (_, res) => {
     res.render("add-todo", {
          title: "Add new todo"
     });
   });

module.exports = router;
