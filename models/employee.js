import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    doj: {
        type: String,
        required: true
    },
    position_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position',
        required: true
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
});

export default mongoose.model('Employee', employeeSchema);
