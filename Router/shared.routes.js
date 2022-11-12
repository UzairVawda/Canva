const express = require('express')

const router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index', { errorMess: ['password must be 8 characters', 'password must match'], errorFlag : true })
})

module.exports = router;