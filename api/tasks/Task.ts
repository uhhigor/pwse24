import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    date: {
        type: Date,
        required: true
    },
    tests: {
        type: Array,
        required: true
    }
});

export default mongoose.model('Task', taskSchema);