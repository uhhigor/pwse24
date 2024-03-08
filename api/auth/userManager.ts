import User from './models/user';
import mongoose from "mongoose";

async function createUser(user: { name: string, surname: string, email: string, password: string }, callback: (err: any, res: any) => void) {
    try {
        const newUser = new User(user);
        const result = newUser.save();
        callback(null, result);
    } catch (e: any) {
        callback(e, null);
    }
}

// Get a user by email
async function getUserByEmail(email: string, callback: (err: any, res: any) => void) {
    try {
        const result = await User.findOne({ email: email }).lean();
        callback(null, result);
    } catch (e: any) {
        callback(e, null);
    }
}

// Get a user by ID

async function getUserById(id: string, callback: (err: any, res: any) => void) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        callback(new Error("Invalid id"), null);
    } else {
        try {
            const result = await User.findById(id).lean();
            callback(null, result);
        } catch(e: any) {
            callback(e, null);
        }
    }
}

// Get all users

async function getAllUsers(callback: (err: any, res: any) => void){
    try {
        const result = await User.find().lean();
        callback(null, result);
    } catch (e: any) {
        callback(e, null);
    }
}

// Update a user

async function updateUser(oldUserId: Number, newUser: {}, callback: (err: any, res: any) => void) {
    try {
        const result = User.findByIdAndUpdate(oldUserId, newUser).lean();
        callback(null, result);
    } catch (e: any) {
        callback(e, null)
    }
}

// Delete a user
async function deleteUser(userId: Number, callback: (err: any, res: any) => void) {
    try {
        const result = User.findByIdAndDelete(userId).lean();
        callback(null, result);
    } catch (e: any) {
        callback(e, null);
    }
}

export default {
    createUser,
    getUserByEmail,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
}