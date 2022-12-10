const db = require('../db/database');
const User = require('../Models/User.model')


function getLogin(req, res){
	userSession = req.session.user
    if (!userSession) {
        userSession = {}
    }
	res.render('login', {data: userSession})
}

function getSignup(req, res){
    userSession = req.session.user1
    if (!userSession) {
        userSession = {}
    }
	res.render('signup', {data: userSession})
}
async function getUserId (userEmail) {
    let userId
    const allUsers = await db.getDB().collection('user').find({}).toArray();
    allUsers.filter(user => {
        if (user.email === userEmail){
            userId = user._id.toString();
        }
    })
    return userId
}
async function loginUser(req, res, next) {
    const { typeEmailX, typePasswordX } = req.body;
    const newUser = new User(typeEmailX, typePasswordX);

    let emailExist = await newUser.checkEmailExist(newUser.email);
    let passCheck = await newUser.passwordCheck(newUser.email, newUser.password);

    if (emailExist === true) {
        console.log('passed email check');
        if (passCheck === true) {
            console.log('passed pass check');
            res.cookie('auth', await getUserId(typeEmailX));
            res.redirect('/')
        }else{
            req.session.user = {
                errorMessage : "*Incorrect password*",
                email : req.body.typeEmailX,
            }
            res.redirect('/login')
        }
    }
    else{
        req.session.user = {
            errorMessage : "*An account with this email doesn't exists*",
            email : req.body.typeEmailX,
        }
        res.redirect('/login')
    }
}

async function signupUser(req, res, next) {
    if (req.body.typePasswordX === req.body.typeCPasswordX) {
        const newUser = new User(req.body.typeEmailX, req.body.typePasswordX)
        let emailExist = await newUser.checkEmailExist(req.body.typeEmailX);
        if (emailExist === true) {
            req.session.user1 = {
                errorMessage : "*An account with this email already exists*",
                email : req.body.typeEmailX,
                password : req.body.typePasswordX
            }
            res.redirect('/signup');
        }
        else {
            try {
                await newUser.signupUser();
                console.log('user created')
                res.redirect('/login')
            } catch (error) {
                next(error);
                return;
            }
        }
    }
    else {
        req.session.user1 = {
            errorMessage : "*Passwords Must Match*",
            email : req.body.typeEmailX,
            password : req.body.typePasswordX
        }
        res.redirect('/signup');
    }

}

function clearLoginSession(req,res,next) {
    req.session.user = {}
    next()
}
function clearSignupSession(req,res,next) {
    req.session.user1 = {}
    next()
}
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
    getLogin : getLogin,
    getSignup : getSignup,
    signupUser : signupUser,
    loginUser : loginUser,
    clearLoginSession : clearLoginSession,
    clearSignupSession : clearSignupSession,
    logout : logout,
    authorize : authorize,
    clearAuthSessions : clearAuthSessions
}