import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/authController.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to get all users
router.get('/users', getAllUsers);

export default router;
