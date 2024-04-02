// Fortune Vaquita server in MongoDB
// by Bernardo F. Martinez Meave
// Mongo DB connection function to Docker container

//"mongodb://mongoadmin:secret@127.0.0.1:27017/miapp?authSource=admin";

// Run Docker Mongo Container
//  sudo docker ps
//  sudo docker rm mongolin -f
//  sudo docker run -d --name mongolin -p27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

const mongoose = require("mongoose");

const MAX_RETRIES = 2;
let retryCount = 0;

// Close the connection when the Node.js process is terminated
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to Node.js process termination");
    process.exit(0);
  });
});

const connectDB = async (req, res) => {
  while (retryCount < MAX_RETRIES) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(
        "MongoDB connected on Host: ".yellow,
        conn.connection.host.cyan,
        " Port: ".yellow,
        conn.connection.port
      );

      break; // If connected successfully, exit the loop
    } catch (error) {
      retryCount++;
      console.error(`Connection attempt ${retryCount} failed:`, error.message);

      if (retryCount === MAX_RETRIES) {
        console.error("Max connection retries reached. Exiting...");

        process.exit(1);
      }
      console.log("Retrying connection...");
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
    }
  }
};

module.exports = connectDB;
