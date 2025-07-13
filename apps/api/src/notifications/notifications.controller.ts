// apps/api/src/notifications/notifications.controller.ts

import {
    Controller,
    Get,
    Req,
    Res,
    UseGuards,
    HttpException,
    HttpStatus,
    Post,
    Body,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
    ) { }

    @Get()
    async getNotifications(@Req() req: Request, @Res() res: Response) {
        try {
            const token = req.cookies?.token;

            if (!token) {
                throw new HttpException('Unauthorized: No token', HttpStatus.UNAUTHORIZED);
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
                userId: string;
            };

            const notifications = await this.notificationsService.getNotifications(decoded.userId);

            return res.status(200).json({ notifications });
        } catch (error) {
            console.error('JWT/Notifications Error:', error);
            return res
                .status(401)
                .json({ message: 'Invalid or expired token', error: error.message });
        }
    }

    @Post()
    async createNotification(
        @Body() body: { message: string; request: string; requestedBy: string },
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const token = req.cookies?.token;
        if (!token) {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: 'Unauthorized: No token' });
        }

        const { message, request, requestedBy } = body;

        if (!message || !request || !requestedBy) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'user name, message and request are required' });
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!,
            ) as jwt.JwtPayload & { userId: string | number };

            const userId = decoded.userId;

            await this.notificationsService.createNotification({
                userId,
                message,
                request,
                requestedBy,
            });

            return res
                .status(HttpStatus.CREATED)
                .json({ message: 'Notification created' });
        } catch (err) {
            console.error('Create Notification Error:', err);
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ message: 'Invalid or expired token' });
        }
    }
}
