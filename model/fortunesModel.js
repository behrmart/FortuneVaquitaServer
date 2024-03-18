// Fortune Vaquita server
// by Bernardo F. Martinez Meave
// Mongo DB Mongoose driver schema definition

// Define Fortune Schema

const mongoose = require("mongoose");

const fortuneSchema = new mongoose.Schema(
  {
    fortune_id: String,
    fortune_message: String,
    hidden: Boolean,
  },
  {
    timestamps: true, // crea campos automaticos de timestamps
  }
);

module.exports = mongoose.model("Fortune", fortuneSchema); // MOdelo en  Letra Capital en singular por "tareas" collection
