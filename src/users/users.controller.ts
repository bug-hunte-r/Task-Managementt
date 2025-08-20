import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUser } from './dto/signup-user/signup-user';
import type { Response } from 'express';
import { generateToken } from 'configs/auth';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    async getAllUser() {
        return await this.userService.getAllUser()
    }

    @Post('Signup')
    async setNewUser(@Body() signupUser: SignupUser, @Res() res: Response) {

        const token = generateToken({ username: signupUser.username })

        res.cookie('access_token', token, {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'strict'
        })

        const newUser = await this.userService.setNewUser(signupUser)

        res.json ({
            data: newUser,
            message: 'User Signuped'
        })
    }
}
