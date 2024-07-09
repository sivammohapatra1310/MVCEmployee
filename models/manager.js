import mongoose from 'mongoose';

const managerSchema = new mongoose.Schema({
    manager_id: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    }
});

const Manager = mongoose.model('Manager', managerSchema);

export default Manager;
