import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import connectToDb from 'configs/db';
import { SignupUser } from './dto/signup-user/signup-user';
import User from 'models/user';
import { hashPassHandler, verifyPassHandler } from 'configs/auth';
import { LoginUsers } from './dto/login-users/login-users';

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
            throw new ConflictException('Username is already exist')
        }

        await User.create({ ...signupUser, password, role: usersCount > 0 ? "USER" : "ADMIN" })
        return { message: 'User Signuped' }

    }

    async loginUser(loginUser: LoginUsers): Promise<object> {

        const user = await User.findOne({ username: loginUser.username })

        if (!user) {
            throw new NotFoundException('Account not found')
        }

        const verifiedPass = await verifyPassHandler(loginUser.password, user.password)

        if (!verifiedPass) {
            throw new UnauthorizedException('Username or password is not correct');
        }

        return user
    }
}
