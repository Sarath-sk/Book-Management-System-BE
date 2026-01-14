const mangoose = require("mongoose")


// creatin user schema
const userSchema = mangoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,

        },
        gender:{
            type: String,
            required: true
        },
        phoneNumber:{
            type: Number,
            required: false
        },
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

// Expprting this schema
module.exports = User = mangoose.model("user", userSchema)