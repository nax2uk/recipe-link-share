const express = require('express');
const router = express.Router();

//controllers
const { register } = require('../controllers/auth');

// validators
const { userRegisterValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/register', userRegisterValidator, runValidation, register);

module.exports = router;