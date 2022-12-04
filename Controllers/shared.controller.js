
function homePage (req, res, next) {
	res.render('index')
}

function logout (req,res) {
    res.clearCookie("auth");
    res.clearCookie("user_id");
	res.redirect('/login');
}
function authorize (req,res,next) {
    const { cookies } = req;
    console.log(cookies)
    if (cookies.auth != 'authorized'){
        res.redirect('/login');
    }
    else {
        next();
    }
}


module.exports = {
    homepage : homePage,
    logout : logout,
    authorize : authorize
}