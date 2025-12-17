import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user/user.schema'

@Controller()
export class AuthController {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  @GrpcMethod('AuthService', 'ValidateOrCreateUser')
  async validateOrCreateUser(data: {
    clerkUserId: string
    email: string
  }) {
    let user = await this.userModel.findOne({
      clerkUserId: data.clerkUserId,
    })

    if (!user) {
      user = await this.userModel.create({
        clerkUserId: data.clerkUserId,
        email: data.email,
        role: 'ADMIN', // first user logic later
      })
    }

    return {
      role: user.role,
      active: user.status,
    }
  }
}
