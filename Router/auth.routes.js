const authController = require('../Controllers/auth.controller');

const express = require('express')

const router = express.Router();

router.get('/login', authController.clearSignupSession, authController.getLogin);

router.get('/signup', authController.clearLoginSession, authController.getSignup);

router.post('/signup', authController.signupUser);

router.post('/login', authController.loginUser);

module.exports = router;