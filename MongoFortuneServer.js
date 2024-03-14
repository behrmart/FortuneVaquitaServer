const express = require("express");
const mongoose = require("mongoose");
var colors = require("colors");
const port = 3000;

// Define Fortune Schema
const Fortunes = mongoose.model(
  "Fortunas",
  new mongoose.Schema({
    id: String,
    message: String,
  })
);

const app = express();
mongoose.connect(
  "mongodb://mongoadmin:secret@127.0.0.1:27017/miapp?authSource=admin"
);
//mensaje de bienvenida
app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200);
  res.send("<h1>Fortunes Mongo DB Server</h1>");
});
// buscar un animal
app.get("/all", async (req, res) => {
  console.log("All Fortunes.. ");
  const fortunes = await Fortunes.find();
  return res.send(fortunes);
});

app.listen(port, () => {
  console.log(
    "Mongo Fortune server running on:".bgBlue +
      " " +
      `http://localhost:${port}`.underline
  );
});
