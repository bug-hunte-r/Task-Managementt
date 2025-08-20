import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User