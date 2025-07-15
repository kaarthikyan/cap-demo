import { Controller, Post, Body } from '@nestjs/common';
import { RabbitMQProducerService } from './rabbitmq-producer.service';

@Controller('rabbitmq')
export class RabbitMQTestController {
  constructor(private readonly producer: RabbitMQProducerService) {}

  @Post('send')
  async send(@Body() body: any) {
    await this.producer.sendMessage(body);
    return { status: 'Message sent', body };
  }
}