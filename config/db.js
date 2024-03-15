// Fortune Vaquita server in MongoDB
// by Bernardo F. Martinez Meave
// Mongo DB connection function to Docker container

//"mongodb://mongoadmin:secret@127.0.0.1:27017/miapp?authSource=admin";

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
