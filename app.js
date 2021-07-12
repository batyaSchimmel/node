const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const router = require('./route/api')
const jwt = require('jsonwebtoken')

app.use(bodyParser.json())

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.CONNECT_DB, connectionParams)
    .then(() => {
        console.log('connect');

    }).catch(err => {
        console.log(err);

    })
// app.use('/', (req, res, next) => {
//     if (!req.path.startsWith('/logIn') && req.path !== '/signUp') {
//         try {
//             jwt.verify(req.headers['authorization'], process.env.SECRET);
//             next();
//         } catch (err) {
//             console.log(err);
//             res.send("not login")
//         }

//     } else
//         next();

// })
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authoriztion");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/', router);

app.listen(4200, () => {
    console.log('listen port 4200!');
})

