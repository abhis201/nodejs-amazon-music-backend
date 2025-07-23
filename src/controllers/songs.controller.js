const Song = require('../models/Song');
const Album = require('../models/Album');

const addSong = async (req, res) => {
    const { name, artist, genre, duration, url, albumId } = req.body;
    
    try {
        const newSong = new Song({
            name,
            artist,
            genre,
            duration,
            url,
            album: albumId
        });
        
        const savedSong = await newSong.save();
        
        // If album is specified, add song to album
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: savedSong._id }
            });
        }
        
        res.status(201).json({
            success: true,
            song: savedSong
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const removeSong = async (req, res) => {
    const songId = req.params.id;
    
    try {
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({
                success: false,
                message: "Song not found"
            });
        }
        
        // Remove song from album if it belongs to one
        if (song.album) {
            await Album.findByIdAndUpdate(song.album, {
                $pull: { songs: songId }
            });
        }
        
        await Song.findByIdAndDelete(songId);
        
        res.json({
            success: true,
            message: "Song removed successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const searchSongByName = async (req, res) => {
    const { name } = req.query;
    
    try {
        const songs = await Song.find({
            name: { $regex: name, $options: 'i' }
        }).populate('album');
        
        res.json({
            success: true,
            songs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const searchSongByGenre = async (req, res) => {
    const { genre } = req.query;
    
    try {
        const songs = await Song.find({
            genre: { $regex: genre, $options: 'i' }
        }).populate('album');
        
        res.json({
            success: true,
            songs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const SongsController = {
    addSong,
    removeSong,
    searchSongByName,
    searchSongByGenre
};

module.exports = SongsController;