const express = require('express')
const authController = require('../Controllers/auth.controller');
const blogController = require('../Controllers/blog.controller')
const multer  = require( 'multer' );

var upload = multer( {
    dest: 'uploads/',
    filename: function ( req, file, cb ) {
        console.log(file.originalname)
        cb( null, file.originalname);
    }
} );

const router = express.Router();

router.get('/', authController.authorize, authController.clearAuthSessions, blogController.fetchHomePage)

router.get('/create', authController.authorize, authController.clearAuthSessions, blogController.fetchCreatePost)

router.get('/editAndDelete', authController.authorize, authController.clearAuthSessions, blogController.fetchEditAndDelete)

router.get('/profile', authController.authorize, authController.clearAuthSessions, blogController.fetchProfile)

router.post('/', authController.logout)

router.post('/create', authController.authorize, authController.clearAuthSessions, upload.single('blogPostImage'), blogController.createPost)

router.post('/editAndDelete/:action/:id', authController.authorize, authController.clearAuthSessions, blogController.deletePost, blogController.fetchEditAndDelete)

module.exports = router;