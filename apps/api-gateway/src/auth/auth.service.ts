import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import  * as microservices from '@nestjs/microservices';
@Injectable()
export class AuthService implements OnModuleInit {
  private authService: any;
    
  constructor(@Inject('AUTH_SERVICE')private client:microservices.ClientGrpc){}
    onModuleInit() {
      this.authService = this.client.getService<any>('AuthService')
    }
  
  getUser(clerkUserId: string) {
    return this.authService.GetUserByClerkId({ clerkUserId });
  }
  validateOrCreateUser(clerkUserId: string,email:string){
    return this.authService.ValidateOrCreateUser(clerkUserId,email)
  }
}
