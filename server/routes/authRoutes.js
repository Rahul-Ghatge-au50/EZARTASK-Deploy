const express = require('express');
const {register,login} = require("../controllers/authController");
const {check} = require('express-validator');
const router = express.Router();

router.post('/register',[
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
],register);

router.post('/login',login);

module.exports = router;
