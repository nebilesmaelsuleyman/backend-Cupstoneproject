import { Injectable, BadRequestException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { SchoolsService } from '../school/school.service'

@Injectable()
export class OnboardingService {
  constructor(
    private readonly usersService: UserService,
    private readonly schoolsService: SchoolsService,
  ) {}

  async onboardUser(
    clerkUserId: string,
    role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT',
    schoolCode: string,
  ) {
    // 1️⃣ Find school by code
    const school = await this.schoolsService.findByCode(schoolCode)
    if (!school) throw new BadRequestException('Invalid school code')

    // 2️⃣ Find user
    const user = await this.usersService.findByClerkId(clerkUserId)
    if (!user) throw new BadRequestException('User not found')

    // 3️⃣ Update user role and schoolIds
    const updatedSchoolIds = [...new Set([...(user.schoolIds || []), school._id])]

    return this.usersService.updateUser(clerkUserId, {
      role,
      schoolIds: updatedSchoolIds,
    })
  }
}
