// Fortune Vaquita server
// by Bernardo F. Martinez Meave
// Mongo DB Mongoose driver schema definition

// Define Fortune Schema

const mongoose = require("mongoose");

const fortuneSchema = new mongoose.Schema(
  {
    fortune_id: {
      type: Number,
      required: true,
      unique: true,
    },
    fortune_message: {
      type: String,
      required: true,
    },
    hidden: Boolean,
  },
  {
    timestamps: true, // crea campos automaticos de timestamps
  }
);

module.exports = mongoose.model("Fortune", fortuneSchema); // MOdelo en  Letra Capital en singular por "tareas" collection
