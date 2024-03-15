// Avaya SDP customer log Backend
// by Bernardo F. Martinez Meave
// Express Router

const express = require("express");
const router = express.Router();
const { getFortunes } = require("../controllers/fortunesController");
// const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getFortunes);

//router.route('/:id').delete(protect, deleteSdplogs).put(protect, updateSdplogs)

module.exports = router;
