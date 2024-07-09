import mongoose from 'mongoose';

const positionSchema = new mongoose.Schema({
    position_name: {
        type: String,
        required: true
    },
});

export default mongoose.model('Position', positionSchema);
