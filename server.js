// ServerJS Avaya SDP Customer Log, communication with Mongo DB Atlas

// Avaya SDP customer log Backend
// by Bernardo F. Martinez Meave
// Server main program

const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 6666;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

console.log("Connecting MongoDB...".yellow);
connectDB();

const app = express();

app.use(express.json()); //para recibir info por un formulario en body
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/fortuneRoutes"));
//app.use("/api/create", require("./routes/fortuneRoutes"));

app.use(errorHandler);

app.listen(port, () =>
  console.log(
    `Fortune Vaquita MongoDB server started listening on TCP port: ${port}`.red
  )
);
