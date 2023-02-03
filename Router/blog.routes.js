const express = require('express')
const authController = require('../Controllers/auth.controller');
const blogController = require('../Controllers/blog.controller')
const multer  = require( 'multer' );

const uploadConfig = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, new Date + file.originalname)
    }
})

const upload = multer({ storage: uploadConfig })

const router = express.Router();

router.get('/', authController.authorize, authController.clearAuthSessions, blogController.fetchHomePage)

router.get('/create', authController.authorize, authController.clearAuthSessions, blogController.fetchCreatePost)

router.get('/editAndDelete', authController.authorize, authController.clearAuthSessions, blogController.fetchEditAndDelete)

router.get('/profile', authController.authorize, authController.clearAuthSessions, blogController.fetchProfile)

router.get('/userProfileImage', authController.authorize, authController.clearAuthSessions, blogController.getUserProfileImage)

router.get('/editAndDelete/:id', authController.authorize, authController.clearAuthSessions, blogController.fetchEditPostModal)



router.post('/', authController.logout)

router.post('/create', authController.authorize, authController.clearAuthSessions, upload.single('blogPostImage'), blogController.createPost)

router.post('/updateOrDelete/:id', authController.authorize, authController.clearAuthSessions, blogController.updateOrDelete)

router.post('/like/:id', blogController.likePost)

router.post('/editProfile', authController.authorize, authController.clearAuthSessions, blogController.eidtProfile)

router.post('/updateProfile', authController.authorize, authController.clearAuthSessions, upload.single('user-profile-image'), blogController.updateProfile)

router.post('/getUserName/:id', authController.authorize, authController.clearAuthSessions, blogController.getUserName)

module.exports = router