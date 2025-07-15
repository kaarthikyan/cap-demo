// apps/api/src/user/user.controller.ts

import {
    Controller,
    Put,
    Body,
    Req,
    Res,
    HttpStatus,
    Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiOperation({ summary: 'Get current user' })
    async getUser(@Req() req: Request, @Res() res: Response) {
        const token = req.cookies?.token;
        if (!token) {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: 'Unauthorized: No token' });
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!,
            ) as jwt.JwtPayload & { email: string };

            const email = decoded.email;

            if (!email) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .json({ message: 'Invalid token: Missing email' });
            }

            const user = await this.userService.getUserByEmail(email);

            if (!user) {
                return res
                    .status(HttpStatus.NOT_FOUND)
                    .json({ message: 'User not found' });
            }

            return res.status(HttpStatus.OK).json({ user });
        } catch (err) {
            console.error('Get User Error:', err);
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: 'Invalid or expired token' });
        }
    }

    @Get('all')
    async getAllUsers(@Req() req: Request, @Res() res: Response) {
        const token = req.cookies?.token;
        if (!token) {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: 'Unauthorized: No token' });
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET!); // Only check validity

            const users = await this.userService.getAllUsers();

            if (!users || users.length === 0) {
                return res
                    .status(HttpStatus.NOT_FOUND)
                    .json({ message: 'Users not found' });
            }

            return res.status(HttpStatus.OK).json({ users });
        } catch (err) {
            console.error('Get Users Error:', err);
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: 'Invalid or expired token' });
        }
    }

    @Put('edit')
    async updateUser(
        @Body() updates: UpdateUserDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const token = req.cookies?.token;
        if (!token) {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: 'Unauthorized: No token' });
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!,
            ) as jwt.JwtPayload & { email: string };

            const updatedUser = await this.userService.updateUserByEmail(
                decoded.email,
                updates,
            );

            if (!updatedUser) {
                return res
                    .status(HttpStatus.NOT_FOUND)
                    .json({ message: 'User not found' });
            }

            return res.status(HttpStatus.OK).json({ user: updatedUser });
        } catch (err) {
            console.error('Edit User Error:', err);
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'Invalid request' });
        }
    }

    @Put('role')
    async updateUserRole(@Body() body: { userId: string; newRole: string }, @Req() req: Request, @Res() res: Response) {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized: No token' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { userId: string };
            const currentUserId = decoded.userId;
            const { userId, newRole } = body;

            await this.userService.updateRole(userId, newRole);

            const updatedUser = await this.userService.findById(userId);

            if (!updatedUser) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
            }

            // If current user updated their own role, refresh token
            if (currentUserId === userId) {
                const newToken = jwt.sign(
                    {
                        email: updatedUser.email,
                        firstName: updatedUser.firstName,
                        lastName: updatedUser.lastName,
                        role: updatedUser.role,
                        userId: updatedUser.id,
                    },
                    process.env.JWT_SECRET!,
                    { expiresIn: '1d' }
                );

                res.setHeader(
                    'Set-Cookie',
                    `token=${newToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
                );

                return res.status(HttpStatus.OK).json({ user: updatedUser });
            }

            return res.status(HttpStatus.OK).json({});
        } catch (err) {
            console.error('Update Role Error:', err);
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid request' });
        }
    }

}
