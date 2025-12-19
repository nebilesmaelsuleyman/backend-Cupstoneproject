import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common'
import { OnboardingService } from './onboarding.service'
import { ClerkAuthGuard } from '../../../common/guards/clerk-auth.guard' // your existing Clerk guard

@Controller('onboarding')
@UseGuards(ClerkAuthGuard)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post()
  async onboard(
    @Req() req,
    @Body() body: { role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT'; schoolCode: string },
  ) {
    const clerkUserId = req.user.sub // Clerk userId from JWT
    return this.onboardingService.onboardUser(clerkUserId, body.role, body.schoolCode)
  }
}
