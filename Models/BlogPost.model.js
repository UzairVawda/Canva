const db = require('../db/database');

class BlogPost {

    constructor(title, summary, imageURL, userId,) {
        this.title = title
        this.summary = summary 
        this.imageURL = imageURL
        this.userId = userId
    }

    async uploadPost() {
        await db.getDB().collection('posts').insertOne({
            title : this.title,
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