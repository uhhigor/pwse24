import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSolutionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    filePath: {
        type: Schema.Types.String
    },
    score: {
        type: Schema.Types.Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('TaskSolution', taskSolutionSchema);