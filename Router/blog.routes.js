const express = require('express')
const authController = require('../Controllers/auth.controller');
const blogController = require('../Controllers/blog.controller')

const router = express.Router();

router.get('/', authController.authorize, authController.clearAuthSessions, blogController.fetchHomePage)

router.get('/create', authController.authorize, authController.clearAuthSessions, blogController.fetchCreatePost)

router.get('/editAndDelete', authController.authorize, authController.clearAuthSessions, blogController.fetchEditAndDelete)

router.get('/profile', authController.authorize, authController.clearAuthSessions, blogController.fetchProfile)


router.post('/', authController.logout)

router.post('/create', authController.authorize, authController.clearAuthSessions, blogController.createPost)

module.exports = router;