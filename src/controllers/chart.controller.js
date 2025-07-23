const Song = require('../models/Song');

const getMostPopularSongs = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    
    try {
        const popularSongs = await Song.find()
            .sort({ playCount: -1 })
            .limit(limit)
            .populate('album');
        
        res.json({
            success: true,
            songs: popularSongs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getRecentlyAddedSongs = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    
    try {
        const recentSongs = await Song.find()
            .sort({ releaseDate: -1 })
            .limit(limit)
            .populate('album');
        
        res.json({
            success: true,
            songs: recentSongs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const ChartController = {
    getMostPopularSongs,
    getRecentlyAddedSongs
};

module.exports = ChartController;