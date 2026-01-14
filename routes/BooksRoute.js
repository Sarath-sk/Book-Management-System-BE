const express = require('express')
const {addBook, getAllBooks, removeBook, getBookById, updateBookById} = require("../controllers/booksController")
const router = express.Router()
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/authAdmin");
const { route } = require('./UserRoute');


//protect API - Admin and Non-admin
router.get("/allBooks", auth, getAllBooks);


// protect and admin only API
router.post("/add", auth, adminAuth, addBook);
router.delete("/:id", auth, adminAuth, removeBook);
router.get("/:id", auth, adminAuth, getBookById);
router.put("/:id", auth, adminAuth, updateBookById);



module.exports = router;