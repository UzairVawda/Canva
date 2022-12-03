const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient

let db;

async function connectTODB() {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017/')
    db = client.db('canva')
}

function getDB(){
    if (!db) {
        throw new Error('FAILED TO CONNECT TO CANVA DB')
    }
    return db
}

module.exports = {
    connectTODB : connectTODB,
    getDB : getDB
}
