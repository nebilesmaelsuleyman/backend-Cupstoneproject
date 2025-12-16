import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import {UserService} from './user.service'

@Controller()
export class UserController{
constructor(private readonly userService:UserService){}
@GrpcMethod('AuthService', 'GetuserByClerkId')
async getDefaultResultOrder(data:{clerkUserId:string}){
    const user = await this.userService.getByclerckId(data.clerkUserId)

    return {
        id:user._id.toString(),
        email:user.email,
        role:user.role
    }

}

}