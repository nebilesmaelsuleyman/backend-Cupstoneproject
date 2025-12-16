import { Injectable, OnModuleInit } from '@nestjs/common';
import * as microservices from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: any;

  constructor(private client: microservices.ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService('AuthService');
  }

  getUser(clerkUserId: string) {
    return this.authService.GetUserByClerkId({ clerkUserId });
  }
}
