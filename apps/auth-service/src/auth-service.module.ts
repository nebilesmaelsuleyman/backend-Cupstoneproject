import { Module } from '@nestjs/common';
import { AuthController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
