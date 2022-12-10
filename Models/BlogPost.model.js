const db = require('../db/database');

class BlogPost {

    constructor(title, caption, summary, imageURL, userId, likeCount, comments) {
        this.title = title
        this.caption = caption
        this.summary = summary 
        this.imageURL = imageURL
        this.userId = userId
        this.likeCount = likeCount
        this.comments = comments
    }

    async uploadPost() {
        await db.getDB().collection('posts').insertOne({
            title : this.title,
            caption : this.caption,
            summary : this.summary,
            imageURL : this.imageURL,
            userId : this.userId,
            likeCount : 0,
            comments : {}
        })
    }
}

module.exports = BlogPost;