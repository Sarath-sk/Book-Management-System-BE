const express = require('express')
const {createUser, getAllUsers, getUserById, loginUser} = require("../controllers/userControl");
const router = express.Router()
const auth = require("../middleware/auth");

// Public routes
router.post("/register", createUser);
router.post("/login", loginUser);

// Protected routes
router.get("/", auth, getAllUsers);
router.get("/:id", auth, getUserById);


// Exportin this router
module.exports = router;