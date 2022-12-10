const Post = require('../Models/BlogPost.model')
const db = require('../db/database');


async function fetchHomePage (req, res, next) {
    const allPosts = await db.getDB().collection('posts').find({}).toArray();

	res.render('home', {posts : allPosts})
}

function fetchCreatePost (req,res,next) {
    res.render('createPost')
}

async function createPost(req, res, next) {
    const body = req.body;
    console.log(req.cookies.auth)
    const url = 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=752&q=80'
    try {
        const newPost = new Post(body.title, body.caption, body.body, url, req.cookies.auth)
        await newPost.uploadPost()  
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

function fetchEditAndDelete (req,res,next) {
    res.render('editAndDelete');
}

function fetchProfile (req,res,next) {
    userName = req.cookies.auth
    res.render('userProfile', {userName});
}


module.exports = {
fetchHomePage : fetchHomePage,
fetchCreatePost : fetchCreatePost,
createPost : createPost,
fetchEditAndDelete : fetchEditAndDelete,
fetchProfile : fetchProfile
}