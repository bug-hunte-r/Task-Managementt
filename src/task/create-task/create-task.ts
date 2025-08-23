import mongoose from "mongoose"

export class CreateTask {
    title: string

    user: mongoose.Types.ObjectId
}