import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUser } from './dto/signup-user/signup-user';
import type { Response } from 'express';
import { generateToken } from 'configs/auth';
import { LoginUsers } from './dto/login-users/login-users';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    async getAllUser() {
        return await this.userService.getAllUser()
    }

    @Post('Signup')
    async setNewUser(@Body() signupUser: SignupUser, @Res() res: Response) {

        try {
            const newUser = await this.userService.setNewUser(signupUser)
            
            const token = generateToken({ username: signupUser.username })
    
            res.cookie('access_token', token, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict'
            })
    
    
            res.status(201).json({
                data: newUser,
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
                sameSite: 'strict'
            })

            return res.status(200).json({ message: 'User logged in' })

        } catch (error) {

            res.status(error.getStatus ? error.getStatus() : 500).json({
                message: error.message
            })
        }

    }
}
