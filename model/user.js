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
    magazins:[{
        type: mongoose.Types.ObjectId,
        ref: 'magazin'
    }],
    adminId: {
        type: mongoose.Types.ObjectId,
        ref: 'admin'
    }
})
module.exports = mongoose.model('user', UserSchema)