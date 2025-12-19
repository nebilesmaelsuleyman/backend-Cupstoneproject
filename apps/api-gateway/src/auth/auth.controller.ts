import {
  Controller,
  Get,
  OnModuleInit,
  Post,
  Body,
  UseGuards,
  Req,
  Inject,
} from '@nestjs/common';
import {AuthGrpcService} from './auth.grpc.service';
import { ClerkAuthGuard } from '../../../common/guards/clerk-auth.guard';


@Controller('auth')
export class AuthController  {
  constructor(private readonly authService:AuthGrpcService) {}

  @UseGuards(ClerkAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    const clerkUserId = req.user.sub;
    const token = req.headers['authorization'];
    return this.authService.getUser(clerkUserId, token);
  }

   @UseGuards(ClerkAuthGuard)
  @Post('onboarding')
  async onboard(@Req() req: any, @Body() body: { role: string; schoolCode: string }) {
    const clerkUserId = req.user.sub;
    return this.authService.onboardUser(clerkUserId, body.role, body.schoolCode);
  }

  
}
