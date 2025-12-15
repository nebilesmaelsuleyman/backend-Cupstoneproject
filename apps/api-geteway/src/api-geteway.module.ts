import { Module } from '@nestjs/common';
import { ApiGetewayController } from './api-geteway.controller';
import { ApiGetewayService } from './api-geteway.service';

@Module({
  imports: [],
  controllers: [ApiGetewayController],
  providers: [ApiGetewayService],
})
export class ApiGetewayModule {}
