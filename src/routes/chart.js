const express = require("express");
const router = express.Router();
const ChartController = require('../controllers/chart.controller');

router.get("/popular", ChartController.getMostPopularSongs);
router.get("/recent", ChartController.getRecentlyAddedSongs);

module.exports = router;