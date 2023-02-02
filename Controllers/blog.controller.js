const Post = require('../Models/BlogPost.model')
const db = require('../db/database');
const mongodb = require('mongodb');
const fs = require('fs');

async function getUserProfileImage(req,res,next){
    const mongoId = new mongodb.ObjectId(req.cookies.auth);
    const profile = await db.getDB().collection('user').findOne({_id: mongoId})

    res.json({ userProfileImg : profile.userProfileImage })
}

async function getUserName(req,res,next) {
    const mongoId = new mongodb.ObjectId(req.params.id);
    const profile = await db.getDB().collection('user').findOne({_id: mongoId})
    const userName = profile.userName
    const userProfileImage = profile.userProfileImage

    res.json({ userName : userName, userProfileImage : userProfileImage })
}

async function fetchHomePage(req, res, next) {
    const allPosts = await db.getDB().collection('posts').find({}).toArray();
    allPosts.reverse()
    res.render('home', { userName : '1234', posts: allPosts, userId: req.cookies.auth})
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
    let mongoId = new mongodb.ObjectId(req.cookies.auth);
    const user = await db.getDB().collection('user').findOne({_id: mongoId})
    let myPosts = [];
    const allPosts = await db.getDB().collection('posts').find({}).toArray();
    allPosts.reverse()
    for (i in allPosts) {
        if (allPosts[i].userId === req.cookies.auth)
            myPosts.push(allPosts[i])
    }
    console.log(user);
    res.render('userProfile', { userId: req.cookies.auth, posts: myPosts, user : user });
}
async function deletePost(req, res, next) {
    const { action, id } = req.params
    const mongoId = new mongodb.ObjectId(id);
    const post = await db.getDB().collection('posts').findOne({_id: mongoId})
    if (action === 'edit') {
        res.render('editPostModal', { post: post })
    }
    if (action === 'delete') {
        await db.getDB().collection('posts').deleteOne({ _id: mongoId }, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                fs.unlinkSync(post.imageURL)
            }
        })
        res.redirect('/editAndDelete')
    }
}
async function updatePost(req,res,next) {
    const mongoId = new mongodb.ObjectId(req.params.id);
    await db.getDB().collection('posts').findOneAndUpdate({ _id: mongoId }, {
        $set: {
            blogTitle: req.body.title,
            summary: req.body.body
        }
    })
    res.redirect('/editAndDelete')
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
        res.json({ message: 'success', likeCount: post.likeCount, action: 'liked'})
    }

}

async function eidtProfile(req,res,next) {
    const mongoId = new mongodb.ObjectId(req.cookies.auth);
    const user = await db.getDB().collection('user').findOne({_id: mongoId})
    res.render('editProfile', { user : user })
}

async function updateProfile(req,res,next) {
    const body = req.body
    const mongoId = new mongodb.ObjectId(req.cookies.auth);
    const profile = await db.getDB().collection('user').findOne({_id: mongoId})
    try {
        if (body.username) {
            await db.getDB().collection('user').findOneAndUpdate({ _id: mongoId }, {
                $set: {
                    userName: body.username
                }
            },(err, result) => {
                if (err) {
                    console.log(err)
                }
            })    
        }
        if (req.file.path)
            await db.getDB().collection('user').findOneAndUpdate({ _id: mongoId }, {
                $set: {
                    userProfileImage: req.file.path
                }
            },(err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    fs.unlinkSync(profile.userProfileImage)
                }
            })    
            res.redirect('/profile')
    }
    catch (error) {
        console.log(error)
        res.redirect('/profile')
    }

}
module.exports = {
    fetchHomePage: fetchHomePage,
    fetchCreatePost: fetchCreatePost,
    createPost: createPost,
    fetchEditAndDelete: fetchEditAndDelete,
    fetchProfile: fetchProfile,
    deletePost: deletePost,
    likePost: likePost,
    updatePost : updatePost,
    eidtProfile : eidtProfile,
    updateProfile : updateProfile,
    getUserProfileImage : getUserProfileImage,
    getUserName : getUserName
}