const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        max: true,
        max: 12,
        unique: true,
        index: true,
        lowercase: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true,
    },
    salt: String,
    role: {
        type: String,
        default: 'subscriber',
    },
    resetPasswordLink: {
        data: String,
        default: '',
    }

}, { timestamps: true })

// virtual fields
// methods >> authenticate, encryptPassword, makeSalt
userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    })

userSchema.methods = {
    authenticate: function (password) {
        return this.encryptPassword(password) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }

    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('User', userSchema);
