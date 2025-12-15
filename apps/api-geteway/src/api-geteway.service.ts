import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiGetewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
