const db = require('../db/database');

class User {

    constructor(userEmail, userPassword, userProfileImage, userName) {
        this.email = userEmail
        this.password = userPassword
        this.userProfileImage = this.userProfileImage
        this.userName = this.userName
    }

    async signupUser() {
        await db.getDB().collection('user').insertOne({
            email : this.email,
            password : this.password,
            userProfileImage : 'img/default-pfp.jpeg',
            userName : ''
        })
    }

    async checkEmailExist(userEmail){
        let check;
        const allUsers = await db.getDB().collection('user').find({}).toArray();
        allUsers.filter(user => {
            if (user.email == userEmail){
                check = true
            }
        })
        return check
    }
    async passwordCheck(userEmail, userPassword) {
        let userPass;
        const allUsers = await db.getDB().collection('user').find({}).toArray();
        allUsers.filter(user => {
            if (user.email == userEmail){
                userPass = user.password;
            }
        })
        if (userPass === userPassword) {
            return true;
        }
    }

}

module.exports = User;