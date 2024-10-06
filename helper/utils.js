const path = require("path");

function readDataFromDbAsJSON() {
  try {
    const dbPath = path.join(__dirname, "..", "db", "todos.json");
    const data = require(dbPath);
    if (data) {
      return data;
    }
    return [];
  } catch (err) {
    console.log("Error while reading data from db: ", err);
  }
}

module.exports = {
  readDataFromDbAsJSON,
};
