const authController = require('../Controllers/auth.controller');

const express = require('express')

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

module.exports = router;