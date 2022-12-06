const db = require('../db/database');

function clearAuthSessions (req,res,next){
    req.session.user = {
        errorMessage : "",
        email : ""
    }
    req.session.user1 = {
        errorMessage : "",
        email : "",
        password : ""
    }
    next()
}

function homePage (req, res, next) {
	res.render('home')
}

function createPost (req,res,next) {
    res.render('createPost')
}

function editAndDelete (req,res,next) {
    res.render('editAndDelete');
}

function profile (req,res,next) {
    res.render('userProfile');
}

function logout (req,res) {
    res.clearCookie("auth");
    res.clearCookie("user_id");
	res.redirect('/login');
}
async function authorize (req,res,next) {
    const { cookies } = req;
    const allUsers = await db.getDB().collection('user').find({}).toArray();
    let check;
    allUsers.filter(user => {
        if (user._id.toString() === cookies.auth){
            check = true;
        }
    })
    if (check != true) {
        res.redirect('login');
    }
    else {
        next()
    }
}


module.exports = {
    homepage : homePage,
    logout : logout,
    authorize : authorize,
    clearAuthSessions : clearAuthSessions,
    createPost : createPost,
    editAndDelete : editAndDelete,
    profile : profile
}