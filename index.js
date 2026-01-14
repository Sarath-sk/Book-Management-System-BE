const express = require('express')
const cors = require("cors")
const userRouter = require('./routes/UserRoute')
const booksRouter = require("./routes/BooksRoute")
require("dotenv").config();


const connectDB = require('./db');
const { connect } = require('mongoose');

// Creatin express app
const app = express()

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// ConnectDB
connectDB()

// require this for express to accept json for POST, PUT, PATCH requests.
app.use(express.json())

// Routes
app.use('/user', userRouter);
app.use('/books', booksRouter);


// App listenin port
app.listen(4000, ()=>{
    console.log("Listening on PORT 4000")
})


