// Avaya SDP customer log Backend
// by Bernardo F. Martinez Meave
// Mongo DB Controller routines

const asyncHandler = require("express-async-handler");

const Fortune = require("../model/fortunesModel");

const getFortunes = asyncHandler(async (req, res) => {
  const fortunes = await Fortune.find();
  res.status(200).json(fortunes);
});

module.exports = {
  getFortunes,
};
