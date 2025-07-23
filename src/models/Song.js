const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Albums'
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in seconds
        required: true
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    playCount: {
        type: Number,
        default: 0
    },
    url: {
        type: String, // URL to the audio file
        required: true
    }
});

const Song = mongoose.model('Songs', SongSchema);

module.exports = Song;