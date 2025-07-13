// apps/api/src/auth/auth.controller.ts

import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignInDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    async signIn(@Body() body: SignInDto, @Res() res: Response) {
        try {
            const token = await this.authService.signIn(body);

            res.setHeader(
                'Set-Cookie',
                `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
            );
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Signed in successfully' });
        } catch (error) {
            if (error.message === 'Invalid credentials') {
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ message: 'Invalid credentials' });
            }
            console.error('Login error:', error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Internal server error' });
        }
    }

    @Post('signout')
    @HttpCode(200)
    signOut(@Res() res: Response) {
        res.setHeader(
            'Set-Cookie',
            'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
        );

        res.json({ message: 'Signed out successfully' });
    }

    @Post('signup')
    @HttpCode(201)
    async signup(@Body() body: SignupDto, @Res() res: Response) {
        try {
            const message = await this.authService.signUp(body);
            res.status(201).json({ message });
        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
    }
}