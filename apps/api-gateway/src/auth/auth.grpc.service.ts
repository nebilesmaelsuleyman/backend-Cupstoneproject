import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import  * as microservices from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGrpcService implements OnModuleInit {
  private authService: any;
    
  constructor(@Inject('AUTH_SERVICE')private client:microservices.ClientGrpc){}
    onModuleInit() {
      this.authService = this.client.getService<any>('AuthService')
    }
  
  async getUser(clerkUserId: string,token:string) {
    const user$ = this.authService.GetUserByClerkId({ clerkUserId,token });
    return await lastValueFrom(user$);
  }
  
  async  validateOrCreateUser(clerkUserId: string,email:string){
    const user$ = this.authService.ValidateOrCreateUser({ clerkUserId, email });
    return await lastValueFrom(user$);
  }

  async onboardUser(clerkUserId: string, role: string, schoolCode: string) {
    const user$ = this.authService.OnboardUser({ clerkUserId, role, schoolCode });
    return lastValueFrom(user$);
  }
}
