const Post = require('../Models/BlogPost.model')
const db = require('../db/database');
const mongodb = require('mongodb');
const path = require('path')

async function fetchHomePage(req, res, next) {
    const allPosts = await db.getDB().collection('posts').find({}).toArray();
    allPosts.reverse()
    res.render('home', { posts: allPosts, userId: req.cookies.auth})
}

function fetchCreatePost(req, res, next) {
    res.render('createPost')
}

async function createPost(req, res, next) {
    const body = req.body;
    try {
        const newPost = new Post(body.title, body.body, req.file.path, req.cookies.auth, 0, [], {})
        await newPost.uploadPost()
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

async function fetchEditAndDelete(req, res, next) {
    let myPosts = [];
    const allPosts = await db.getDB().collection('posts').find({}).toArray();
    allPosts.reverse()
    for (i in allPosts) {
        if (allPosts[i].userId === req.cookies.auth)
            myPosts.push(allPosts[i])
    }
    res.render('editAndDelete', { posts: myPosts });
}

async function fetchProfile(req, res, next) {
    const userName = req.cookies.auth
    let myPosts = [];
    const allPosts = await db.getDB().collection('posts').find({}).toArray();
    allPosts.reverse()
    for (i in allPosts) {
        if (allPosts[i].userId === req.cookies.auth)
            myPosts.push(allPosts[i])
    }
    res.render('userProfile', { userName, posts: myPosts, userId: req.cookies.auth });
}
async function deletePost(req, res, next) {
    const { action, id } = req.params
    const mongoId = new mongodb.ObjectId(id);
    if (action === 'delete') {
        await db.getDB().collection('posts').deleteOne({ _id: mongoId }, (err, result) => {
            if (err) {
                console.log(err)
            }
        })
        res.redirect('/editAndDelete')
    }
}

async function likePost(req, res) {
    const userName = req.cookies.auth
    let mongoId;
    try {
        mongoId = new mongodb.ObjectId(req.params.id);
    } catch (error) {
        res.json({ message: 'failed', errorMessage: error})
    }

    let post = await db.getDB().collection('posts').findOne({_id: mongoId})
    let alreadyLiked = false
    for (user of post.likedUsers) {
        if (user === userName) {
            alreadyLiked = true
        }
    }
    if (alreadyLiked === true) {
        await db.getDB().collection('posts').findOneAndUpdate({ _id: mongoId }, {
            $inc: {
                likeCount: -1
            },
            $pull: {
                likedUsers: userName
            }
        })
        post = await db.getDB().collection('posts').findOne({_id: mongoId})
        console.log(post);
        res.json({ message: 'success', likeCount: post.likeCount, action: 'unliked'})
    }
    else {
        await db.getDB().collection('posts').findOneAndUpdate({ _id: mongoId }, {
            $inc: {
                likeCount: 1
            },
            $push: {
                likedUsers: userName
            }
        })
        post = await db.getDB().collection('posts').findOne({_id: mongoId})
        console.log(post);
        res.json({ message: 'success', likeCount: post.likeCount, action: 'liked'})
    }

}

module.exports = {
    fetchHomePage: fetchHomePage,
    fetchCreatePost: fetchCreatePost,
    createPost: createPost,
    fetchEditAndDelete: fetchEditAndDelete,
    fetchProfile: fetchProfile,
    deletePost: deletePost,
    likePost: likePost
}