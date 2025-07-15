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
import { WinstonModule } from 'nest-winston';
import { apiLoggerOptions } from './logger/api-logger';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler/scheduler.service';
import { ClientsModule,Transport } from '@nestjs/microservices';
import { RabbitMQConsumerController } from './rabbitmq/rabbitmq-consumer.controller';
import { RabbitMQTestController } from './rabbitmq/rabbitmq-test.controller';
import { RabbitMQProducerService } from './rabbitmq/rabbitmq-producer.service';
import { EmailService } from './email/email.service';
@Module({
  imports: [
    WinstonModule.forRoot(apiLoggerOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as any as import('sequelize').Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [User],
      autoLoadModels: true,
      synchronize: true, // ❗disable in production
      pool: {
      max: 10,      // maximum number of connections
      min: 2,       // minimum number of connections
      acquire: 30000, // maximum time (ms) to try getting connection before throwing error
      idle: 10000,    // maximum time (ms) a connection can be idle before being released
  },
    }),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
          queue: 'notification_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    SequelizeModule.forFeature([User, Notification]),
  ],
  controllers: [
    AuthController,
    NotificationsController,
    UserController,
    RabbitMQConsumerController,
    RabbitMQTestController
  ],
  providers: [
    AuthService,
    NotificationsService,
    UserService,
    SchedulerService,
    RabbitMQProducerService,
    EmailService
  ],
})
export class AppModule { }
