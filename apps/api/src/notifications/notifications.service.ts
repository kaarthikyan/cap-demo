// apps/api/src/notifications/notifications.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from '../models/notification.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notification)
        private notificationModel: typeof Notification,
    ) { }

    async getNotifications(userId: string) {
        let notifications = await this.notificationModel.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });

        if (!notifications || notifications.length === 0) {
            // fallback to all notifications
            notifications = await this.notificationModel.findAll({
                order: [['createdAt', 'DESC']],
            });
        }

        return notifications;
    }

    async createNotification({
        userId,
        message,
        request,
        requestedBy,
    }: {
        userId: string | number;
        message: string;
        request: string;
        requestedBy: string;
    }) {
        await this.notificationModel.create({
            userId,
            message,
            request,
            requestedBy,
            image: '/images/user/user-03.jpg',
            read: false,
        } as CreationAttributes<Notification>);
    }

}
