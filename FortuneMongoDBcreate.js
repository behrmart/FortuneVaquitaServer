const mongoose = require("mongoose");
const fs = require("fs");

const uri =
  "mongodb://mongoadmin:secret@127.0.0.1:27017/miapp?authSource=admin";

// Define Fortune Schema
const fortuneSchema = new mongoose.Schema({
  id: String,
  message: String,
});

// Create Fortune model
const Fortune = mongoose.model("Fortune", fortuneSchema);

// Read JSON file
const rawData = fs.readFileSync("fortunes.json");
const fortunes = JSON.parse(rawData);

async function insertFortunes() {
  try {
    await mongoose.connect(uri, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Insert each fortune as a document
    await Fortune.insertMany(fortunes);
    console.log(fortunes);
    console.log("Fortunes inserted successfully.");
  } catch (error) {
    console.error("Error inserting fortunes:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

insertFortunes();
