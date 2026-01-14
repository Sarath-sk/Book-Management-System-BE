const mongoose = require("mongoose");


const bookSchema = mongoose.Schema(
    {
        id:{
            type: String,
            trim: true
        },
        title:{
            type: String,
            required: true,
            trim: true
        },
        author:{
            type: String,
            required: true,
            trim: true
        },
        isbn:{
            type:String,
            unique: true,
            required: true,
            trim:true
        },
        category:{
            type: String,
            required: true,
            trim: true
        },
        status:{
            type: String,
            enum: ["Available", "Out of Stock"],
            default: "Available",
            required: true,
        },
        publishedYear: {
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        stock:{
            type: Number,
            required: true
        },
        description: {
            type: String,
            trim: true
        },
        coverImage:{
            type: String,
            trim:true
        }
    },
    {
        timestamps: true
    }
);

module.exports = Books = mongoose.model("books", bookSchema);