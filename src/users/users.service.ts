import { Injectable } from '@nestjs/common';
import connectToDb from 'configs/db';
import { SignupUser } from './dto/signup-user/signup-user';
import User from 'models/user';
import { hashPassHandler } from 'configs/auth';

connectToDb()
@Injectable()
export class UsersService {

    async getAllUser(): Promise<object> {
        let allUsers = await User.find({})
        return allUsers
    }

    async setNewUser(signupUser: SignupUser): Promise<object> {

        let usersCount = await User.countDocuments()

        let password = await hashPassHandler(signupUser.password)

        let isUsernameExist = await User.findOne({ username: signupUser.username })

        if (isUsernameExist) {
            return { message: 'This username is already exist' }
        }

        await User.create({ ...signupUser, password, role: usersCount > 0 ? "USER" : "ADMIN" })
        return { message: 'User Signuped' }

    }
}
