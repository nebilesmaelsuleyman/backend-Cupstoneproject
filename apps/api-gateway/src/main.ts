import { NestFactory } from '@nestjs/core';
import { AppModule } from './api-geteway.module';
import { credentials } from '@grpc/grpc-js';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
    app.enableCors({
    origin: 'http://localhost:4000', // your Next.js frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  });
  
  await app.listen(process.env.port ?? 3000);
console.log(`🚀 API Gateway is running on: http://localhost:3000`);
}
bootstrap();
