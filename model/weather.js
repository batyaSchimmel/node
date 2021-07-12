const mongoose = require('mongoose')


const WeatherSchema = mongoose.Schema({
    city: {
        type: String
    },
    temp: {
        type: Number

    },
    wind: {
        speed: {
            type: String
        },
        deg: {
            type: String
        }

    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
})
module.exports = mongoose.model('weather', WeatherSchema)