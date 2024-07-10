const mongoose = require("mongoose");
const fs = require("fs");

const uri =
  "mongodb+srv://bfelipemm:BOGjvj90HJUtbs68@behrcluster0.x9iyqme.mongodb.net/Fortunes?retryWrites=true&w=majority&appName=BehrCluster";

// Define Fortune Schema
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
