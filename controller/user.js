const User = require('../model/user')
const request = require('request')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
// const Admin = require('../model/admin')
// const Weather = require('../model/weather')


function sendMail(email, name) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'b@alter1.com',
            pass: 'bbatya0527178182'
        }
    });

    var mailOptions = {
        from: 'b@alter1.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: `welcome ${name}!!!!`
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve('Email sent: ' + info.response);
            }
        });
    })

}

const logIn = (req, res) => {
    const token = jwt.sign({ name: req.param.name, password: req.param.password }, process.env.SECRET)
    res.send(token);
}

const sign = async (req,res)=>{
    const nu=new User(req.body)
   await nu.save()
   res.send('sigh user')
}


const signUp = (req, res) => {
    const user = new User(req.body);
    console.log(user);
    user.save().then(user => {
        res.json({ user: user })
        // Admin.findByIdAndUpdate(req.body.adminId, { $push: { 'users': user._id } })
            // .then(u => {
            //     sendMail(u.email, u.name)
            //         .then(() =>
            //             res.json({ user: user }))
            //         .catch(err => {
            //             console.log(err);
            //         })
            // })
            .catch(err => {
                console.log(err)
            })

    }).catch(err => {
        res.send(err);
    });
}




// const signUp = (req, res) => {
//     const user = new User(req.body)
//     console.log(user);

//     user.save().then(user => {
//         Admin.findByIdAndUpdate(req.body.adminId, { $push: { 'users': user._id } })
//             .then(u => {
//                 sendMail(u.email, u.name)
//                     .then(() => {
//                         res.json({ user: u })
//                     }).catch((err) => {
//                         res.json({ message: err })
//                     })

//             }).catch((err) => {
//                 res.json({ message: err })
//             }).catch((err) => {
//                 res.json({ message: err })
//             })
//     })


// }
const getAllUser = (req, res) => {
    User.find().then(data => {
        res.json({ myUser: data })
    }).catch(err => {
        res.json({ message: err })
    })
}
const updatUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true }).then(data => {
        res.json({ myUser: data })
    }).catch(err => {
        res.json({ message: err })
    })
}
const getUserById = (req, res) => {
    User.findById(req.params.id).then(data => {
        res.json({ myUser: data })
    }).catch(err => {
        res.json({ message: err })
    })
}
const deleteWeather = (req, res) => {
    Weather.findByIdAndDelete(req.params.id).then((data) => {
        console.log(data);

        User.findByIdAndUpdate(data.userId, { $pull: { 'weathers': data._id } })
            .then((user) => {
                res.json({ message: user })
            }).catch(err => {
                res.json({ message: err })
            })
    }).catch(err => {
        res.json({ message: err })
    })

}
// .pre('remov')

module.exports = { sign, getAllUser, sendMail, signUp, logIn, getUserById, updatUser, deleteWeather }
