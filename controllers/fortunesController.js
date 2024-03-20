// Avaya SDP customer log Backend
// by Bernardo F. Martinez Meave
// Mongo DB Controller routines

const asyncHandler = require("express-async-handler");
const Fortune = require("../model/fortunesModel");
const fs = require("fs");

const getAllFortunes = asyncHandler(async (req, res) => {
  const fortunes = await Fortune.find();
  res.status(200).json(fortunes);
});

const getOneFortune = asyncHandler(async (req, res) => {
  Fortune.events.on("error", (err) => console.log(err.message));
  console.log(req.params.id);
  const fortune = await Fortune.find({ fortune_id: req.params.id })
    .exec()
    .catch();
  console.log(fortune);
  if (!fortune) {
    res.status(404);
    throw new Error("getFortune: Fortune ID not found");
  } else {
    res.status(200).json(fortune);
  }
});

const createFortuneDB = asyncHandler(async (req, res) => {
  const rawData = fs.readFileSync("fortunes.json");
  const fortunes = JSON.parse(rawData);
  console.log(fortunes);

  const fortunesDB = await Fortune.insertMany(fortunes);
  res.status(201).json(fortunesDB);
});

module.exports = {
  getAllFortunes,
  getOneFortune,
  createFortuneDB,
};
