const Album = require('../models/Album');

const createAlbum = async (req, res) => {
    const { name, artist, genre, coverImage, description } = req.body;
    
    try {
        const existingAlbum = await Album.findOne({ name });
        if (existingAlbum) {
            return res.status(400).json({
                success: false,
                message: "Album with this name already exists"
            });
        }
        
        const newAlbum = new Album({
            name,
            artist,
            genre,
            coverImage,
            description
        });
        
        const savedAlbum = await newAlbum.save();
        
        res.status(201).json({
            success: true,
            album: savedAlbum
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('songs');
        if (!album) {
            return res.status(404).json({
                success: false,
                message: "Album not found"
            });
        }
        
        res.json({
            success: true,
            album
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find().populate('songs');
        
        res.json({
            success: true,
            albums
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const AlbumController = {
    createAlbum,
    getAlbum,
    getAllAlbums
};

module.exports = AlbumController;