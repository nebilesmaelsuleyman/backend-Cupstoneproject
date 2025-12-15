import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import * as microservices from '@nestjs/microservices'

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: any

  constructor(
    @Inject('AUTH_SERVICE') private readonly client: microservices.ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService('AuthService')
  }

  validateOrCreateUser(clerkUserId: string, email: string) {
    return this.authService.ValidateOrCreateUser({
      clerkUserId,
      email,
    })
  }
}
