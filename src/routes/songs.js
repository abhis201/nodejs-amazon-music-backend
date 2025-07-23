const express = require("express");
const router = express.Router();
const SongsController = require('../controllers/songs.controller');
const auth = require('../middleware/auth');

router.post("/add", auth, SongsController.addSong);
router.delete("/:id", auth, SongsController.removeSong);
router.get("/search/name", SongsController.searchSongByName);
router.get("/search/genre", SongsController.searchSongByGenre);

module.exports = router;