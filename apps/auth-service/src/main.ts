import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('AuthService');
  const GRPC_URL = 'localhost:5001';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: "auth", // Ensure this matches your proto 'package auth;'
        protoPath: join(process.cwd(), 'proto/auth.proto'),
        url: GRPC_URL,
      }
    }
  );

  await app.listen();
  
  // This will show up clearly in your terminal
  logger.log(`✅ Auth Microservice is listening on: ${GRPC_URL}`);
}
bootstrap();