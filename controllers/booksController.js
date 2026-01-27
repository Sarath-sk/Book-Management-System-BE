const Books = require("../models/Books");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");


const addBook = async (req, res) =>{
    try{
        const {title, author,isbn, category, status, publishedYear, price, stock, description, coverImage} = req.body;

        // checking mandatory Fields
        if (!title || !isbn || !author || !category || !status || publishedYear === undefined || price === undefined || !stock === undefined){
            return res.status(400).json({
                message: "Bad Request, Please try again later!"
            });
        }

        // checking duplicates
        const existingBook = await Books.findOne({isbn});
        if(existingBook){
            return res.status(409).json({
                message: "Book already exists"
            });
        }

        // Adding new book
        const AddNewBook = Books({
            title,
            author,
            isbn,
            category,
            status,
            publishedYear,
            price,
            stock,
            description,
            coverImage
        });

        await AddNewBook.save();

        res.status(201).json({
            message: "Book added successfully",
            user: AddNewBook
        });
    }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }

};


const getAllBooks = async (req, res) =>{
    try{
        const books = await Books.find()

        res.status(200).json({
            count:books.length,
            books
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to fetch users, try again later",
            error: error.message
        });
    }
}

const getBookById = async (req, res) =>{
    try{
        const {id} = req.params;
        const book = await Books.findOne({_id:id});

        if(!book){
            res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            book
        })
    }catch(error){
        res.status(500).json({
            message: "Failed to fecth book, try again later.",
            error: error.message
        });
    }
}

const updateBookById = async (req, res) =>{
    try{
        const {id} = req.params;
        const book = await Books.findOne({_id:id});

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).json({
                message: "Invalid book ID"
            });
        }

        const updateBook = await Books.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            {
                new: true,
                runValidator: true
            }
        );

        if(!updateBook){
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully.",
            book: updateBook
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to delete book",
            error: error.message
        });
    }
}

const removeBook = async (req, res) =>{
    try{
        const {id} = req.params;
        const book = await Books.findOne({_id:id});

        if(!book){
            res.status(404).json({
                message: "Book not found!"
            });
        }

        await Books.findByIdAndDelete(id);

        res.status(200).json({
            message: "Book deleted successfully!"
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to delete book",
            error: error.message
        });
    }
}

const searchBook = async (req, res) =>{
    try{
        const {query} = req.query;
        let findQuery = {};

        if(query && query.trim() !== ""){
            findQuery = {
                $or: [
                    {title: {$regex: query, $options: "i"}},
                    {autor: {$regex: query, $options: "i"}},
                    {isbn: {$regex: query, $options: "i"}}
                ]
            };
        }

        const books = await Books.find(findQuery);
        res.status(200).json(books)
    }catch(error){
        res.status(500).json({
            message: "Search failed",
            error
        });
    }
}


module.exports = {addBook, getAllBooks, removeBook, getBookById, updateBookById, searchBook};