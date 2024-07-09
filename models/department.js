import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    department_name: {
        type: String,
        required: true,
        unique: true 
    },
    manager_id: {
        type: String,
        required: true
    },
});

export default mongoose.model('Department', departmentSchema);
