import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { School } from './school.schema'

@Injectable()
export class SchoolsService {
  constructor(
    @InjectModel(School.name)
    private readonly schoolModel: Model<School>,
  ) {}

  private generateSchoolCode(): string {
    return Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()
  }

  async createSchool(name: string, adminUserId: string) {
    const schoolCode = this.generateSchoolCode()

    const existing = await this.schoolModel.findOne({ schoolCode })
    if (existing) {
      throw new BadRequestException('School code already exists')
    }

    return this.schoolModel.create({
      name,
      schoolCode,
      createdBy: adminUserId,
    })
  }

  async findByCode(code: string) {
    return this.schoolModel.findOne({ schoolCode: code })
  }
}
