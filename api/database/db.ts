import mongoose from 'mongoose';
const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://igorb:x7XIPP7GytXhkKZx@cluster0.bsvkzrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {});
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed');
    }
}
export default connect;