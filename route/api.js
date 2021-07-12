const router = require('express').Router();
const user = require('../controller/user')
const weather = require('../controller/weather')
const admin = require('../controller/admin')

router.get('/hello',admin.hello)
//user sign
router.post('/signUp', user.signUp)
router.post('/sign', user.sign)
router.get('/logIn', user.logIn)
router.patch('/updatUser/:id', user.updatUser)
router.get('/getUserById/:id', user.getUserById)
router.get('/getAllUser', user.getAllUser)
router.delete('/deleteWeather/:id', user.deleteWeather)

//weather
router.post('/creatWeather', weather.creatWeather)
router.get('/getAllWeathers/:id', weather.getAllWeathers)
//admin
router.post('/createAdmin', admin.createAdmin)
router.get('/logInAdmin', admin.logInAdmin)
router.get('/getAllUsers/:id', admin.getAllUsers)
router.patch('/updateAdmin/:id', admin.updateAdmin)
router.delete('/deleteUser/:id', admin.deleteUser)




module.exports = router;