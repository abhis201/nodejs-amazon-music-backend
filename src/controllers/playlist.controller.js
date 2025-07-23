const User = require('../models/User');
const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

const createPlaylist = async(req, res) => {
    const Name = req.body.name;
    const description = req.body.description;
    const _id = req.user;
    
    try{
    const getPlaylist = await Playlist.findOne({Name});
    if(getPlaylist){
        return res.status(400).json({
            success: false,
            message: "Playlist with the name already exists"
        });
    }
    const newPlaylist = new Playlist({
        "Name": Name,
        "description": description,
        "createdBy": _id
    });
    await newPlaylist.save();

    const getUser = await User.findOne({_id});
    getUser.playlist = getUser.playlist || []
    getUser.playlist.push(newPlaylist._id);
    await getUser.save();
    
    res.status(201).json({
        success: true,
        playlist: newPlaylist
    });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const deletePlaylist = async (req, res) => {
    const playlistId = req.params.id;
    const userId = req.user;
    
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found"
            });
        }
        
        // Check if user owns the playlist
        if (playlist.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own playlists"
            });
        }
        
        await Playlist.findByIdAndDelete(playlistId);
        
        // Remove playlist from user's playlists
        await User.findByIdAndUpdate(userId, {
            $pull: { playlist: playlistId }
        });
        
        res.json({
            success: true,
            message: "Playlist deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const addASongToPlaylist = async (req, res) => {
    const playlistId = req.params.id;
    const { songId } = req.body;
    const userId = req.user;
    
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found"
            });
        }
        
        // Check if user owns the playlist
        if (playlist.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You can only modify your own playlists"
            });
        }
        
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({
                success: false,
                message: "Song not found"
            });
        }
        
        // Check if song is already in playlist
        if (playlist.Songs.includes(songId)) {
            return res.status(400).json({
                success: false,
                message: "Song already in playlist"
            });
        }
        
        playlist.Songs.push(songId);
        await playlist.save();
        
        res.json({
            success: true,
            message: "Song added to playlist successfully",
            playlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const removeSongFromPlaylist = async (req, res) => {
    const playlistId = req.params.id;
    const { songId } = req.body;
    const userId = req.user;
    
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found"
            });
        }
        
        // Check if user owns the playlist
        if (playlist.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You can only modify your own playlists"
            });
        }
        
        // Remove song from playlist
        playlist.Songs = playlist.Songs.filter(id => id.toString() !== songId);
        await playlist.save();
        
        res.json({
            success: true,
            message: "Song removed from playlist successfully",
            playlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)
            .populate('Songs')
            .populate('createdBy', 'userid');
        
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found"
            });
        }
        
        res.json({
            success: true,
            playlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const PlaylistController = {
    createPlaylist,
    deletePlaylist,
    addASongToPlaylist,
    removeSongFromPlaylist,
    getPlaylist
};

module.exports = PlaylistController;