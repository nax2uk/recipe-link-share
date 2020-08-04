const AWS = require('aws-sdk');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { registerEmailParams } = require('../helpers/email');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.register = (req, res) => {

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
                console.log('email submitted to SES', data);
                res.status(204).send({ msg: `Email has been sent to ${email}, Follow the instructions to complete your registration` });
            })
            .catch(error => {
                console.log('ses email on register', error);
                res.status(error.statusCode).send({ error: "We could not verify your email.Please try again." });
            });
    });


};