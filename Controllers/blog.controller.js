const Post = require('../Models/BlogPost.model')
const db = require('../db/database');
const mongodb = require('mongodb');
const path = require('path')

async function fetchHomePage(req, res, next) {
    const allPosts = await db.getDB().collection('posts').find({}).toArray();
    allPosts.reverse()
    res.render('home', { posts: allPosts })
}

function fetchCreatePost(req, res, next) {
    res.render('createPost')
}

async function createPost(req, res, next) {
    const body = req.body;
    //get the file
    console.log(req.file)
    // upload to local 
    
    const url = '';
    try {
        const newPost = new Post(body.title, body.body, url, req.cookies.auth)
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
    userName = req.cookies.auth
    let myPosts = [];
    const allPosts = await db.getDB().collection('posts').find({}).toArray();
    allPosts.reverse()
    for (i in allPosts) {
        if (allPosts[i].userId === req.cookies.auth)
            myPosts.push(allPosts[i])
    }
    res.render('userProfile', { userName, posts: myPosts });
}
async function deletePost(req, res, next) {
    const { action, id } = req.params
    const mongoId = new mongodb.ObjectId(id);
    if (action === 'delete') {
        await db.getDB().collection('posts').deleteOne({_id: mongoId}, (err, result) => {
            if (err){
                console.log(err)
            }
        })
        res.redirect('/editAndDelete')
    }
}


module.exports = {
    fetchHomePage: fetchHomePage,
    fetchCreatePost: fetchCreatePost,
    createPost: createPost,
    fetchEditAndDelete: fetchEditAndDelete,
    fetchProfile: fetchProfile,
    deletePost: deletePost
}