import mongoose from "mongoose";
import User from "./user";

const taskSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    user: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)

export default Task