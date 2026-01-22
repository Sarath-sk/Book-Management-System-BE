const Books = require("../models/Books");
const User = require("../models/User");
const Transactions = require("../models/Transactions");

const borrowBook = async (req, res) =>{
    try{
        const {bookId} = req.params;
        const user = await User.findById(req.user.id);
        const book = await Books.findById(bookId);

        if(!book || book.stock <=0){
            return res.status(400).json({
                message: "Book is Out Of Stock"
            });
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate()+14);

        const newTransaction = new Transactions({
            bookId:book._id,
            bookTitle:book.title,
            userId:user._id,
            userName: user.name,
            dueDate
        });

        book.stock -= 1;

        await newTransaction.save();
        await book.save();

        res.status(201).json({
            message: "Book borrowed successfully",
            transaction: newTransaction
        });
    }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

const transactionsList = async (req, res) =>{
    try{
        const transactions = await Transactions.find();

        res.status(200).json({
            count: transactions.length,
            transactions 
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to fetch transactions, Please try again later",
            error: error.message
        });
    }
}

const getMyTransactionList = async (req, res) =>{
    try{
        const myTransactions = await Transactions.find({userId: req.user.id});
        res.status(200).json({
            count: myTransactions.length,
            transactions: myTransactions
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to fetch transactions, Please try again later.",
            error: error.message
        });
    }
}


const returnBook = async (req, res) =>{
    try{
        const {transactionId} = req.params;
        const transaction = await Transactions.findById(transactionId);

        if(!transaction){
            return res.status(404).json({
                message: "Transaction not found!"
            });
        }

        if(transaction.status === "Returned"){
            return res.status(400).json({
                message: "This has been already returned"
            });
        }

        const book = await Books.findById(transaction.bookId);

        transaction.status = "Returned";
        transaction.returnDate = new Date();

        if(book){
            book.stock +=1;
            if(book.stock>0) book.status = "Available";
            await book.save();
        }

        await transaction.save();

        res.status(200).json({
            message: "Book Status updated successfully..!!"
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to update the transaction, Please try again later",
            error: error.message
        });
    }
}


module.exports = {borrowBook, transactionsList, getMyTransactionList, returnBook};