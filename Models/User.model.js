const db = require('../db/database')

class User {

    constructor(userEmail, userPassword) {
        this.email = userEmail
        this.password = userPassword
    }

    async signupUser() {
        await db.getDB().collection('user').insertOne({ user : {
            email : this.email,
            password : this.password
        }})
    }

    async checkEmailExist(userEmail){
        let check;
        const allUsers = await db.getDB().collection('user').find({}).toArray();
        allUsers.filter(user => {
            if (user.user.email == userEmail){
                check = true
            }
        })
        return check
    }
    async passwordCheck(userEmail, userPassword) {
        let userPass;
        const allUsers = await db.getDB().collection('user').find({}).toArray();
        allUsers.filter(user => {
            if (user.user.email == userEmail){
                userPass = user.user.password;
            }
        })
        if (userPass === userPassword) {
            return true;
        }
    }
}

module.exports = User;