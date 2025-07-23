const express = require("express");
const router = express.Router();
const PlaylistController = require('../controllers/playlist.controller');
const auth = require('../middleware/auth');

router.post("/create", auth, PlaylistController.createPlaylist);
router.get("/:id", PlaylistController.getPlaylist);
router.delete("/:id", auth, PlaylistController.deletePlaylist);
router.put("/:id/add-song", auth, PlaylistController.addASongToPlaylist);
router.put("/:id/remove-song", auth, PlaylistController.removeSongFromPlaylist);

module.exports = router;