// Avaya SDP customer log Backend
// by Bernardo F. Martinez Meave
// Express Router

const express = require("express");
const router = express.Router();
const {
  getAllFortunes,
  getOneFortune,
  createFortuneDB,
} = require("../controllers/fortunesController");
// const { protect } = require("../middleware/authMiddleware");

router.get("/getAllFortunes", getAllFortunes);
router.get("/:id", getOneFortune);
router.get("/CreateFortuneDB", createFortuneDB);

module.exports = router;
