import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',  // <-- frontend origin
    credentials: true,
  });
 app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
      queue: 'notification_queue',
      queueOptions: { durable: false },
    },
  });
  app.useGlobalPipes(new ValidationPipe());
 const config = new DocumentBuilder()
    .setTitle('Hridhya Tech API')
    .setDescription('API documentation for Hridhya Tech')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
