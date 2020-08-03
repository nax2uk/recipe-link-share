const mongoose = require('mongoose');

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