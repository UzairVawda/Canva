function getLogin(req, res, next){
	res.render('login')
}

function getSignup(req, res, next){
	res.render('signup')
}

module.exports = {
    getLogin : getLogin,
    getSignup : getSignup
}