import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {join} from 'path'
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport:Transport.GRPC,
      options:{
        package:"auth",
        protoPath:join(process.cwd(),'proto/auth.proto')
      }
    }
  
  );
  await app.listen();
  Logger.log('Auth mudule is running with GRpc')
}
bootstrap();
