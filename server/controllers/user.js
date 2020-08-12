const AWS = require('aws-sdk');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const { registerEmailParams, forgotPasswordEmailParams } = require('../utils/email');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.userRegister = (req, res) => {

    const { name, email, password } = req.body;

    // check if email exists in database
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).send({
                error: 'Email is already taken.'
            })
        }
        const token = jwt.sign({ name, email, password },
            process.env.JWT_ACCOUNT_ACTIVATION,
            { expiresIn: '10m' });

        // send email
        const params = registerEmailParams(email, token);
        const sendEmailOnRegister = ses.sendEmail(params).promise();

        sendEmailOnRegister
            .then(data => {
                //console.log('email submitted to SES', data);
                res.status(202).send({ msg: `Email has been sent to ${email}. Follow the instructions to complete your registration` });
            })
            .catch(error => {
                //console.log('ses email on register', error);
                res.status(error.statusCode).send({ error: "We could not verify your email.Please try again." });
            });
    });


};

exports.userActivate = (req, res) => {
    const { token } = req.body;

    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: 'Expired link. Try again'
            })
        };

        const { name, email, password } = jwt.decode(token);
        const username = shortid.generate();

        User.findOne({ email }).exec((err, user) => {
            if (user) {
                return res.status(401).send({

                    error: 'The email you are registering already exist',
                })
            }
            const newUser = new User({ username, name, email, password });
            newUser.save((err, result) => {
                if (err) {
                    return res.status(401).send({ error: 'Error saving user in database. Try again later.' })
                }
                return res.status(201).send({ msg: 'Registration is a success, please login.' })

            });
        });

    });
}
exports.userProfile = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}

exports.userForgotPassword = (req, res) => {
    const { email } = req.body;
    // check if user email is in database
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist.'
            });
        }
        //generate json webtoken
        const token = jwt.sign(
            { name: user.name },
            process.env.JWT_RESET_PASSWORD,
            { expiresIn: '15m' }
        );
        //sendEmail
        const params = forgotPasswordEmailParams(email, token);

        //populate the db > user >resetPasswordLink
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.status(400).json({
                    error: 'Password reset failed. Try later.'
                })
            }

            const sendEmail = ses.sendEmail(params).promise();
            sendEmail
                .then(data => {
                    console.log('ses reset pw success', data);
                    return res.status(200).json({
                        msg: `Email has been sent to ${email}. Click on the link to reset your password.`
                    })
                })
                .catch(error => {
                    console.log('ses reset pw failed', error);
                    return res.status(400).json({
                        msg: 'We could not verify your email. Please verify later.'
                    });
                })
        })
    })

    //email user
}

exports.userResetPassword = () => { }