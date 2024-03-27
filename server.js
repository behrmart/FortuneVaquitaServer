// Fortune Vaquita Server
// Express, MongoDB, Docker, Mongoose
// by @behrmart
// Server main program

const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 6666;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

console.log("Starting connection to MongoDB...".gray);
connectDB();

const app = express();

app.use(cors());

app.use(express.json()); //para recibir info por un formulario en body
app.use(express.urlencoded({ extended: false }));

app.use("/fortune", require("./routes/fortuneRoutes"));
//app.use("/api/create", require("./routes/fortuneRoutes"));

app.use(errorHandler);

app.listen(port, () =>
  console.log("Fortune Vaquita Server listening on TCP port:".green, port.red)
);
