const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const dbPath = path.join(__dirname, "..", "db", "todos.json");
const db = require(dbPath);
function readDataFromDbAsJSON() {
  try {
    if (db) {
      return db;
    }
    return [];
  } catch (err) {
    console.log("Error while reading data from db: ", err);
  }
}

function writeDataToDb(data) {
  try {
    const newTodo = {
      id: uuidv4(),
      title: data.title,
      desc: data.desc,
      completed: false,
    };
    db.push(newTodo);
    storeTodosToDb(db);
  } catch (err) {
    console.log("Error while writing data to db: ", err);
  }
}

function storeTodosToDb(todos) {
  try {
    fs.writeFile(dbPath, JSON.stringify(todos , null, 2), "utf8", (err) => {
      if (err) {
        console.log("Error while writing todos.json file: ", err);
      } else {
        console.log("Successfully wrote to todos.json file!");
      }
    });
  } catch (err) {
    console.log("Error while storing todos: ", err);
  }
}

module.exports = {
  readDataFromDbAsJSON,
  writeDataToDb,
  storeTodosToDb,
};
