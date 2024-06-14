// Fortune Backend Controller
// by @behrmart
// Mongo DB Controller routines

const asyncHandler = require("express-async-handler");
const Fortune = require("../model/fortunesModel");

const getAllFortunes = asyncHandler(async (req, res) => {
  console.log("Getting all fortunes");
  const fortunes = await Fortune.find();
  res.status(200).json(fortunes);
});

const getOneFortune = asyncHandler(async (req, res) => {
  Fortune.events.on("error", (err) => console.log(err.message));
  console.log("getting fortune No.:", req.params.id);
  const fortune = await Fortune.find({ fortune_id: req.params.id })
    .exec()
    .catch();

  if (!fortune) {
    res.status(404);
    throw new Error("getFortune: Fortune ID not found");
  } else {
    res.status(200).json(fortune);
  }
});

const getRandomFortune = asyncHandler(async (req, res) => {
  const count = await Fortune.countDocuments();
  const random = Math.floor(Math.random() * count);
  const fortune = await Fortune.findOne().skip(random);
  console.log(
    "Getting random fortune No.:",
    random,
    "JSON: ",
    fortune.fortune_message.green
  );
  res.status(202).json(fortune);
});

const createFortune = asyncHandler(async (req, res) => {
  const { fortune_message } = req.body;
  console.log("Got to createFortune");

  try {
    // Find the latest fortune_id
    const lastFortune = await Fortune.findOne(
      {},
      {},
      { sort: { fortune_id: -1 } }
    );
    console.log("Last fortune ID:", lastFortune.fortune_id);
    // Initialize the new fortune_id
    let newFortuneId = 1;

    // If there is an existing lastFortune, increment its id by 1
    if (lastFortune) {
      newFortuneId = lastFortune.fortune_id + 1;
      console.log("New fortune ID:", newFortuneId);
    }

    // Create a new Fortune document with the newFortuneId
    const newFortune = new Fortune({
      fortune_id: newFortuneId,
      fortune_message,
    });

    // Save the new Fortune document to the database
    await newFortune.save();

    res.status(201).json(newFortune);
  } catch (error) {
    console.error("Error creating fortune:", error);
    res.status(500).json({ error: "Error creating fortune" });
  }
});

const destroyFortune = asyncHandler(async (req, res) => {
  const fortune = await Fortune.findById(req.params.id);
  if (!fortune) {
    res.status(400);
    throw new Error("Fortune not found");
  } else {
    Fortune.deleteOne(fortune)
      .then((row) => {
        console.log("deleted Fortune No:", req.params.id);
        res.status(204).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: "Error Destroy One fortune" });
      });
  }
});

module.exports = {
  getAllFortunes,
  getOneFortune,
  getRandomFortune,
  createFortune,
  destroyFortune,
};
