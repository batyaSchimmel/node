const Magazin = require('../model/Magazin')
const request = require('request')
const User = require('../model/user')
const jwt = require('jsonwebtoken')


const requestApi = (city) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ad26638d7ff7d40d97c09432d35b638`
        }
        request(options, function (err, res, body) {
            if (err) {
                reject(err)
            }
            else
                resolve(body)
        });
    })
}

const creatWeather = async (req, res) => {
    try {
        const newWeather = await requestApi(req.body.city)
        console.log(newWeather);
        let result = JSON.parse(newWeather)
        const weather = new Weather(
            {
                city: req.body.city,
                temp: result.main.temp,
                wind: result.wind,
                userId: req.body.userId
            }
        )
        console.log(weather);
        const newWeatherr = await weather.save()
        User.findByIdAndUpdate(req.body.userId, { $push: { 'weathers': newWeatherr._id } })
            .then(() => {
                res.json({ weather: weather })
            }).catch((err) => {
                res.json({ massege: err });
            })
    }
    catch (err) {
        res.json({ massege: err });
    }
    // const weather=new Weather(req.body.name)

}
const createMagazine = (req, res) => {
    const magazine = new Magazin(req.body);
    console.log(magazine);
    magazine.save().then(magazine => {
        User.findByIdAndUpdate(req.body.userId, { $push: { 'magazins': magazine._id } })
            .catch(err => {
                console.log(err)
            })

    }).catch(err => {
        res.send(err);
    });
}


const getMagazinByUserId = (req, res) => {
    User.findById(req.params.id)
        .populate({ path: 'magzins' })
        .then((data) => {
            res.json({ myMagazins: data.magazins })
        }).catch((err) => {
            res.json({ message: err })
        })
}




module.exports = { createMagazine, getMagazinByUserId }