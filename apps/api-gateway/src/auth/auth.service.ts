import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import  * as microservices from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private authGrpcService: any;
    
  constructor(@Inject('AUTH_SERVICE')private client:microservices.ClientGrpc){}
    onModuleInit() {
      this.authGrpcService = this.client.getService<any>('AuthService')
    }
  
  async getUser(clerkUserId: string) {
    const user$ = this.authGrpcService.GetUserByClerkId({ clerkUserId });
    return await lastValueFrom(user$);
  }
  
  async  validateOrCreateUser(clerkUserId: string,email:string){
    const user$ = this.authGrpcService.ValidateOrCreateUser({ clerkUserId, email });
    return await lastValueFrom(user$);
  }
}
