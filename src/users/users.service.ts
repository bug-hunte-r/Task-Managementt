import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import connectToDb from 'configs/db';
import { SignupUser } from './dto/signup-user/signup-user';
import User from 'models/user';
import { hashPassHandler, verifyPassHandler, veryfiTokenHandler } from 'configs/auth';
import { LoginUsers } from './dto/login-users/login-users';
import { Request } from 'express';

connectToDb()
@Injectable()
export class UsersService {

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

    async getUserFromRequest(req: Request) {

        const token = req.cookies?.['access_token']

        if (!token) {
            throw new UnauthorizedException('Token not found')
        }

        try {

            const verifiedToken = await veryfiTokenHandler(token)

            if (!verifiedToken) {
                throw new UnauthorizedException('Invalid token')
            }

            const mainUser = await User.findOne({ username: verifiedToken.username })

            return mainUser

        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token')
        }
    }
}
