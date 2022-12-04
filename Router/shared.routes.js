const express = require('express')
const sharedController = require('../Controllers/shared.controller');

const router = express.Router();

router.get('/', sharedController.authorize, sharedController.homepage)

router.post('/', sharedController.logout)

module.exports = router;