const mongoose = require('mongoose')

const PlayListSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
        unique:true
    },
    Songs:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Songs'
        }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
})

const playlist = mongoose.model("PlayLists",PlayListSchema);

module.exports = playlist;
