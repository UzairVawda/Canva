const express = require('express')
const sharedController = require('../Controllers/shared.controller');

const router = express.Router();

router.get('/', sharedController.authorize, sharedController.clearAuthSessions, sharedController.homepage)

router.get('/create', sharedController.authorize, sharedController.clearAuthSessions, sharedController.createPost)

router.get('/editAndDelete', sharedController.authorize, sharedController.clearAuthSessions, sharedController.editAndDelete)

router.get('/profile', sharedController.authorize, sharedController.clearAuthSessions, sharedController.profile)


router.post('/', sharedController.logout)

module.exports = router;