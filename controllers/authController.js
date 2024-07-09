import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// User registration
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'user_first_name user_email user_password user_type'); // Select the fields you want to display
        res.json({
            status: true,
            data: users
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};
export const registerUser = async (req, res) => {
    const { user_first_name, user_email, user_password, user_type } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ user_email });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'User already exists',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Create new user
        const newUser = new User({
            user_first_name,
            user_email,
            user_password: hashedPassword,
            user_type,
        });

        // Save user to the database
        await newUser.save();

        res.json({
            status: true,
            message: 'User registered successfully',
            data: newUser,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

// User login
export const loginUser = async (req, res) => {
    const { user_email, user_password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ user_email });
        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'User not found',
            });
        }

        // Check password
        console.log(user.user_password);
        const isMatch = await bcrypt.compare(user_password, user.user_password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: 'Invalid credentials',
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { user_id: user._id, user_type: user.user_type },
            'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.json({
            status: true,
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};
