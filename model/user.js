const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String,
        minLength: 6
    },
    email: {
        type: String
    },
    weathers: [{
        type: mongoose.Types.ObjectId,
        ref: 'weather'
    }],
    adminId: {
        type: mongoose.Types.ObjectId,
        ref: 'admin'
    }
})
module.exports = mongoose.model('user', UserSchema)