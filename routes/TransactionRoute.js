const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/authAdmin");
const {borrowBook, transactionsList, getMyTransactionList, returnBook} = require("../controllers/transactionController")


// protected API , Admin and Non Admin
router.get("/allTransactions", auth, transactionsList);
router.get("/mytransactions", auth, getMyTransactionList);
router.post("/borrow/:bookId", auth, borrowBook);

// Projected with admin access
router.put("/return/:transactionId", auth, adminAuth, returnBook);



module.exports = router;