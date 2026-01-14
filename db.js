// const {MongoClient, ServerApiVersion} = require('mongodb')
const mongoose = require('mongoose')


const URL = "mongodb+srv://sarath:Sarathsk758@cluster0.7uaqzbt.mongodb.net/?appName=Cluster0";

// const client = new MongoClient(URL)

async function connectDB(){
    try {
        await mongoose.connect(URL)
        console.log('DB connected successfully...')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB