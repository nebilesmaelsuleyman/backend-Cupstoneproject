import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from './auth/jwt.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async me(@Req() req) {
    const clerkUserId = req.user.sub;
    return this.authService.getUser(clerkUserId);
  }
}
