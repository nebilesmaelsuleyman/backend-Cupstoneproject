import { Controller, Post, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller()
export class ClerkwebhookController{
    constructor(private readonly userService:UserService){}
    @Post()
    async handle(@Req()req:any){
        const event = req.body;

        if(event.type === 'user.created'){
            const user = event.data;

            await this.userService.createUser({
                clerckUserId:user.id,
                email:user.email_addresses[0].email_address,
                firstName: user.first_name,
                lastName: user.last_name,
                role: 'STUDENT',

            })
        }
        if(event.type === 'user.updated'){
            const user= event.data;

           await this.userService.updateByClerkId(user.id, {
        email: user.email_addresses[0].email_address,
        firstName: user.first_name,
        lastName: user.last_name,
      });
        }
        return {received:true}
    }
}