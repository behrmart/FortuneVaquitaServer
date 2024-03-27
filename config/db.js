// Fortune Vaquita server in MongoDB
// by Bernardo F. Martinez Meave
// Mongo DB connection function to Docker container

//"mongodb://mongoadmin:secret@127.0.0.1:27017/miapp?authSource=admin";

// Run Docker Mongo Container
//  sudo docker ps
//  sudo docker rm mongolin -f
//  sudo docker run -d --name mongolin -p27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "MongoDB connected on Host: ".yellow,
      conn.connection.host.cyan,
      " Port: ".yellow,
      conn.connection.port
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
