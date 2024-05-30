import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const testSchema = new Schema({
    givenInput: {
        type: String,
        required: true
    },
    expectedOutput: {
        type: String,
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
    }
});

export default mongoose.model('TaskTest', testSchema);