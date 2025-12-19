import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common'
import { SchoolsService } from './school.service'
import { RolesGuard } from '../../../common/guards/role.guard'
import { Roles } from '../../../common/decorators/role.decorator'

@Controller('schools')
@UseGuards(RolesGuard)
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @Roles('ADMIN')
  async createSchool(
    @Req() req,
    @Body('name') name: string,
  ) {
    const adminUserId = req.user.sub // Clerk userId
    return this.schoolsService.createSchool(name, adminUserId)
  }
}
