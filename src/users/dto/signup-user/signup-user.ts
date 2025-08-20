import { IsString, MaxLength, MinLength } from "class-validator";
import mongoose from "mongoose";

export class SignupUser {
    @IsString()
    id: mongoose.Types.ObjectId;
    
    @IsString()
    @MaxLength(15)
    @MinLength(3)
    username: string;

    @IsString()
    @MinLength(5)
    password: string

    @IsString()
    role: string
}
