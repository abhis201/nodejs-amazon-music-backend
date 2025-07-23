const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    genre: {
        type: String,
        required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Songs'
    }],
    coverImage: {
        type: String // URL to cover image
    },
    description: {
        type: String
    }
});

const Album = mongoose.model('Albums', AlbumSchema);

module.exports = Album;
