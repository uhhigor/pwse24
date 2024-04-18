import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({

});

export default mongoose.model('Task', taskSchema);