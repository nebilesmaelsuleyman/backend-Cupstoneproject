import { NestFactory } from '@nestjs/core';
import { AppModule } from './api-geteway.module';
import { credentials } from '@grpc/grpc-js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:[
      'http://localhost:3000',
    ],
    credentials:true,
  })
  
  await app.listen(process.env.port ?? 3000);

}
bootstrap();
