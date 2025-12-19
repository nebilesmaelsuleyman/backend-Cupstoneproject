import { GrpcMethod } from '@nestjs/microservices';
import {BadRequestException, Controller } from '@nestjs/common'
import {OnboardingService} from './onboarding.service'

@Controller()
export class OnboardingGrpcController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @GrpcMethod('AuthService', 'OnboardUser')
  async onboardUserGrpc(data: { clerkUserId: string; role: string; schoolCode: string }) {
     if (!data.clerkUserId || !data.role || !data.schoolCode) {
      throw new BadRequestException('Missing required fields');
    }

    return this.onboardingService.onboardUser(data.clerkUserId, data.role as any, data.schoolCode);
  }
}
