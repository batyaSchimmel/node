const mongoose = require('mongoose')


const PostSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String

    },
    image: {
        type:String

    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],
    views:[{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],
    date:{
        type:String
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
})
module.exports = mongoose.model('post', PostSchema)