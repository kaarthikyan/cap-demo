import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsService } from './notifications/notifications.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Notification } from './models/notification.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql', // or postgres, sqlite, etc.
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'hridhyatech',
      models: [User],
      autoLoadModels: true,
      synchronize: true, // ❗disable in production
    }),
    SequelizeModule.forFeature([User, Notification]),
  ],
  controllers: [AuthController, NotificationsController, UserController],
  providers: [AuthService, NotificationsService, UserService],
})
export class AppModule { }
