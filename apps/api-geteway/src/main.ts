import { NestFactory } from '@nestjs/core';
import { ApiGetewayModule } from './api-geteway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGetewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
