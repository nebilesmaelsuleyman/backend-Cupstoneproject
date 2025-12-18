import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const logger = new Logger('AuthService');

  // 🔹 HTTP SERVER (for Clerk webhook)
  const app = await NestFactory.create(AuthServiceModule);


  app.use(express.json());

  await app.listen(3002);
  logger.log('🌐 HTTP server listening on http://localhost:3002');


  const grpc =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AuthServiceModule,
      {
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(process.cwd(), 'proto/auth.proto'),
          url: 'localhost:5002',
        },
      },
    );

  await grpc.listen();
  logger.log('🔌 gRPC listening on localhost:5002');
}

bootstrap();
