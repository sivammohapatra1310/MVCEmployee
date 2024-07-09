import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js'; // Ensure the path to the User model is correct
import './config/db.js'; // Ensure this connects to your MongoDB

const createAdminUser = async () => {
    try {
        const existingAdmin = await User.findOne({ user_email: "brahmadev@creator.com" });
        
        if (existingAdmin) {
            console.log("Admin user already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash("Brahma@Infinity", 10);
        const user = new User({
            user_first_name: "Brahma",
            user_email: "brahma@creator.com",
            user_password: hashedPassword,
            user_type: "Admin"
        });

        await user.save();
        console.log("Admin user created");
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        mongoose.disconnect();
    }
};

createAdminUser();
