import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';

@Injectable()
export class RabbitMQProducerService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  async sendMessage(message: any) {
    this.logger.log(`Sending message: ${JSON.stringify(message)}`);
    
    // 'notification_queue' is the queue name, but for RMQ transport, use a pattern (routing key)
    return this.client.emit('notification_event', message).toPromise();
  }
}