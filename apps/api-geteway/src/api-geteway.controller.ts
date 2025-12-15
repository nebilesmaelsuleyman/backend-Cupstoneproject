import { Controller, Get } from '@nestjs/common';
import { ApiGetewayService } from './api-geteway.service';

@Controller()
export class ApiGetewayController {
  constructor(private readonly apiGetewayService: ApiGetewayService) {}

  @Get()
  getHello(): string {
    return this.apiGetewayService.getHello();
  }
}
