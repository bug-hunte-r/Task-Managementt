import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUser } from './dto/signup-user/signup-user';
import type { Request, Response } from 'express';
import { generateToken } from 'configs/auth';
import { LoginUsers } from './dto/login-users/login-users';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('Signup')
    async setNewUser(@Body() signupUser: SignupUser, @Res() res: Response) {

        try {
            const newUser = await this.userService.setNewUser(signupUser)

            const token = generateToken({ username: signupUser.username })

            res.cookie('access_token', token, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 48
            })


            res.status(201).json({
                message: 'User Signuped'
            })

        } catch (error) {

            res.status(error.getStatus ? error.getStatus() : 500).json({
                message: error.message
            })
        }

    }

    @Post('Login')
    async loginUser(@Body() loginUser: LoginUsers, @Res() res: Response) {

        try {
            await this.userService.loginUser(loginUser)

            const token = generateToken({ username: loginUser.username })

            res.cookie('access_token', token, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 48
            })

            return res.status(200).json({ message: 'User logged in' })

        } catch (error) {

            res.status(error.getStatus ? error.getStatus() : 500).json({
                message: error.message
            })
        }

    }

    @Get('me')
    async GetOneUser(@Req() req: Request, @Res() res: Response) {
        try {

            const user = await this.userService.getUserFromRequest(req)
            return res.status(200).json({
                data: user
            })

        } catch (error) {
            res.status(error.getStatus ? error.getStatus() : 500).json({
                message: error.message
            })
        }
    }
}
