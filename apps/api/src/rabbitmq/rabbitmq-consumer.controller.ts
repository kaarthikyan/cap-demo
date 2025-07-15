import { Controller,Inject } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
@Controller()
export class RabbitMQConsumerController {

  constructor(
     @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    private readonly emailService: EmailService
  ) {}

  @EventPattern('notification_event')
  async handleMessage(@Payload() data: any, @Ctx() context: RmqContext) {
  this.logger.log(`Received message: ${JSON.stringify(data)}`);

  // Sending email to user
  const email = data?.email || data?.data?.email;
  const username = data?.username || data?.data?.username || data?.data?.firstName;

    if (email && username) {
      await this.emailService.sendMail(
        email,
        'Welcome!',
        `Hello ${username}, welcome to Hridhya Technologies!`
      );
      this.logger.log(`Sent welcome email to ${email}`);
    } else {
      this.logger.error('Email or username missing in message payload');
    }
    // Acknowledge the message
  //   const channel = context.getChannelRef();
  //   const originalMsg = context.getMessage();
  //   channel.ack(originalMsg);
  }
}