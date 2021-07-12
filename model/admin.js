const mongoose = require('mongoose')


const AdminSchema = mongoose.Schema({
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
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }]
})
module.exports = mongoose.model('admin', AdminSchema)
