const express = require('express')
const {createUser, getAllUsers, getUserById, loginUser, updateUserById, changePassword} = require("../controllers/userControl");
const router = express.Router()
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/authAdmin");


// Public routes
router.post("/register", createUser);
router.post("/login", loginUser);

// Protected routes
router.get("/", auth, adminAuth, getAllUsers);
router.put("/update-password", auth, changePassword);
router.get("/:id", auth, getUserById);
router.put("/update/:id", auth, updateUserById);


// Exportin this router
module.exports = router;