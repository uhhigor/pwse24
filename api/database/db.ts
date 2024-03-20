import mongoose from 'mongoose';
const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI!, {});
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed');
    }
}
export default connect;