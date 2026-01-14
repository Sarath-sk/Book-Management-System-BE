const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const createUser = async (req, res) =>{

    try{
        const {name, email, password, gender, phoneNumber} = req.body;
        
        // checking if any field is empty
        if(!name || !email || !password || !gender){
            return res.status(400).json({
                message: "Please fill the mandatory fields"
            });
        }


        // check if user is already existing or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = User({
            name,
            email,
            password:hashedPassword,
            gender,
            phoneNumber
        });
        // console.log(newUser)
        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getAllUsers = async (req, res)=>{
    try{
        const users = await User.find().select("-password");

        res.status(200).json({
            count:users.length,
            users
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to fetch users, try again later",
            error: error.message
        });
    }
};


const getUserById = async (req, res) => {
    try{
        const {id}= req.params;
        const user = await User.findById(id).select("-password");

        if(!user){
            res.status(404).json({
                message: "User not found!"
            });
        }

        res.status(200).json({
            user
        });
    }catch(error){
        res.status(500).json({
            message: "Invalid User Id",
            error: error.message
        });
    }
};

const loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body;

        // validation
        if(!email || !password){
            return res.status(400).json({
                message: "Email or Password are required"
            });
        }

        // check user is there or not
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({
            message: "Login Successfull",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }catch(error){
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }

}


module.exports = {createUser, getAllUsers, getUserById, loginUser};