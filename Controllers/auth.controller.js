function getLogin(req, res, next){
	res.send("SAY HELLO FROM login");
}

function getSignup(req, res, next){
	res.send("SAY HELLO FROM signup");
}

module.exports = {
    getLogin : getLogin,
    getSignup : getSignup
}