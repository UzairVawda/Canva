const db = require('../db/database');

class BlogPost {

    constructor(title, summary, imageURL, userId, likeCount, likedUsers, comments) {
        this.title = title
        this.summary = summary 
        this.imageURL = imageURL
        this.userId = userId
        this.likeCount = likeCount
        this.likedUsers = likedUsers
        this.comments = comments
    }

    async uploadPost() {
        await db.getDB().collection('posts').insertOne({
            blogTitle : this.title,
            summary : this.summary,
            imageURL : this.imageURL,
            userId : this.userId,
            likeCount : 0,
            likedUsers : [],
            comments : {}
        })
    }
}

module.exports = BlogPost;