import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const testSchema = new Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
});

export default mongoose.model('Test', testSchema);