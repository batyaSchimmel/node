const Admin = require('../model/admin')
const User = require('../model/user');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const hello = async (req,res)=>{
try{
    console.log('hello');
    res.send('succeful')
    
}
catch{
    console.log(err);
    
}
}
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

const createAdmin = (req, res) => {
    const newAdmin = new Admin(req.body)
    newAdmin.save().then((admin) => {
        sendMail(admin.email, admin.name)
            .then(() => {
                res.json({ myUser: admin })
            }).catch((err) => {
                res.json({ message: err });

            })

    }).catch((err) => {
        res.json({ message: err });

    })


}
const getAllUsers = (req, res) => {
    Admin.findById(req.params.id)
        .populate({ path: 'users', select: 'name email' })
        .then((data) => {
            res.json({ myusers: data.users })
        }).catch((err) => {
            res.json({ message: err })
        })
}

const logInAdmin = (req, res) => {
    const token = jwt.sign({ name: req.param.name, password: req.param.password }, process.env.SECRET)
    res.send(token);
}

const updateAdmin = (req, res) => {
    Admin.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        .then((data) => {
            res.json({ updated: data })
        }).catch(err => {
            res.json({ message: err })
        })
}

const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id).then((data) => {
        console.log(data);

        Admin.findByIdAndUpdate(data.adminId, { $pull: { 'users': data._id } })
            .then((admin) => {
                res.json({ message: admin })
            }).catch(err => {
                res.json({ message: err })
            })
    }).catch(err => {
        res.json({ message: err })
    })

}
module.exports = {hello, createAdmin, getAllUsers, logInAdmin, updateAdmin, deleteUser }