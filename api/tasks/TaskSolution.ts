import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSolutionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    textBlob: {
        type: Schema.Types.Buffer,
        required: true
    },
    score: {
        type: Schema.Types.Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('TaskSolution', taskSolutionSchema);