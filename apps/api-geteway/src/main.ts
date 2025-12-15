import { NestFactory } from '@nestjs/core';
import { ApiGetewayModule } from './api-geteway.module';
import { credentials } from '@grpc/grpc-js';

async function bootstrap() {
  const app = await NestFactory.create(ApiGetewayModule);
  app.enableCors({
    origin:[
      'http://localhost:3000',
    ],
    credentials:true,
  })
  
  await app.listen(process.env.port ?? 3000);

}
bootstrap();
