import mongoose from 'mongoose';
const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI!, {});
    } catch (error) {
        return error;
    }
}
export default connect;