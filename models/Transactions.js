const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
    {
        bookId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },
        bookTitle:{
            type: String,
            required: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        userName:{
            type:String,
            required: true
        },
        issueDate:{
            type: Date,
            default: Date.now
        },
        dueDate:{
            type: Date,
            required: true
        },
        returnDate:{
            type: Date,
        },
        status:{
            type: String,
            enum: ["Issued", "Returned"],
            default: "Issued"
        }
    }
);


module.exports = mongoose.model('transaction', transactionSchema);