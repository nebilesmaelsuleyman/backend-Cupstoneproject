import {
  Controller,
  Get,
  OnModuleInit,
  Req,
  UseGuards,
  Inject,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import { ClerkAuthGuard } from './clerk-auth.guard';



@Controller('auth')
export class AuthController  {
  constructor(private readonly authService:AuthService) {}

  @UseGuards(ClerkAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    console.log('🔥 get me controller is hitted');

    const clerkUserId = req.user.sub;
     console.log('clerckid from getme ', clerkUserId)
    const user = await this.authService.getUser(clerkUserId);
    if (!user) {
      console.log('User not found, creating user...');
      return await this.authService.validateOrCreateUser(clerkUserId, req.user.email);
    }

    return user;
  }

  
}
