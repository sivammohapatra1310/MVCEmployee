import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_first_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', userSchema);
