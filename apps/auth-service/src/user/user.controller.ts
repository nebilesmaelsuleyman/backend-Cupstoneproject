import { Controller } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { UserService } from './user.service';
import { status } from '@grpc/grpc-js';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // The first arg is the Service name, the second is the Method name from your .proto file
@GrpcMethod('AuthService', 'GetUserByClerkId')
async getUser(data: { clerkUserId: string }) {
  const user = await this.userService.getByClerkId(data.clerkUserId);

  if (!user) return null;

  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

  // Adding a method for creating users via gRPC if needed
    @GrpcMethod('AuthService', 'CreateUser')
    async createUser(data: any) {
      const newUser = await this.userService.createUser(data);
      // normalize in case the service returns an array
      const user = Array.isArray(newUser) ? newUser[0] : newUser;
      if (!user) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'User creation failed',
        });
      }
      return {
        id: user._id?.toString(),
        email: user.email,
        role: user.role,
      };
    }
}