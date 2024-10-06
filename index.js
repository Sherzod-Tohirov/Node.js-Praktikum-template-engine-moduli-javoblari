const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const todoRoutes = require("./routes/todo");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", todoRoutes);

app.set("view engine", "ejs");
app.set("views", "views");

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
