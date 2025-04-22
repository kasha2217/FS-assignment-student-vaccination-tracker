const express = require('express');
const { login, register } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/register', register); // SIGNUP
authRouter.post('/login', login);       // SIGNIN

module.exports = authRouter;
