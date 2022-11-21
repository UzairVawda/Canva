const db = require('../db/database');
const User = require('../Models/User.model')

function getLogin(req, res){
	res.render('login')
}

function getSignup(req, res){
	res.render('signup')
}

async function loginUser(req, res, next) {
    const { typeEmailX, typePasswordX } = req.body;
    const newUser = new User(typeEmailX, typePasswordX);
    // verify information

    // check email already exisit 
    let emailExist = await newUser.checkEmailExist(newUser.email);
    let passCheck = await newUser.passwordCheck(newUser.email, newUser.password);
    if (emailExist === true) {
        console.log('passed email check');
        if (passCheck === true) {
            console.log('passed pass check');
            res.redirect('/')
        }else{
            console.log('failed check')
            res.redirect('./login');
        }
    }
    else{
    res.redirect('/signup')
    }
}

async function signupUser(req, res, next) {
    const newUser = new User(req.body.typeEmailX, req.body.typePasswordX)
    let emailExist = await newUser.checkEmailExist(req.body.typeEmailX);
    if (emailExist === true) {
        console.log('user already exists');
        res.redirect('/login');
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

module.exports = {
    getLogin : getLogin,
    getSignup : getSignup,
    signupUser : signupUser,
    loginUser : loginUser
}