const express = require("express");
const router = express.Router();
const AlbumController = require('../controllers/album.controller');
const auth = require('../middleware/auth');

router.post("/create", auth, AlbumController.createAlbum);
router.get("/", AlbumController.getAllAlbums);
router.get("/:id", AlbumController.getAlbum);

module.exports = router;
