const mongoose = require('mongoose')


const MagazinSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String

    },
    image: {
        type:String

    },
    postId: [{
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }],
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    date:{
        type:String
    }
})
module.exports = mongoose.model('magzin', MagazinSchema)