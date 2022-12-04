const db = require('../db/database');
const User = require('../Models/User.model')


function getLogin(req, res){
	res.render('login') 
}

function getSignup(req, res){
    userSession = req.session.user
    console.log(userSession);
    if (!userSession) {
        userSession = {
            email : "",
            password : ""
        }
    }
	res.render('signup', {data: userSession})
}
async function getUserId (userEmail) {
    let userId
    const allUsers = await db.getDB().collection('user').find({}).toArray();
    allUsers.filter(user => {
        if (user.email == userEmail){
            userId = user._id;
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
            res.cookie('auth', 'authorized');
            res.cookie('user_id', await getUserId(typeEmailX))
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
    if (req.body.typePasswordX === req.body.typeCPasswordX) {
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
    else {
        req.session.user = {
            errorMessage : "Passwords Must Match",
            email : req.body.typeEmailX,
            password : req.body.typePasswordX
        }
        console.log('passwords must match');
        getSignup(req,res);
    }

}


module.exports = {
    getLogin : getLogin,
    getSignup : getSignup,
    signupUser : signupUser,
    loginUser : loginUser
}