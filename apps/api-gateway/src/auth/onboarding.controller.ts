import {Controller ,Post ,Body,Req,UseGuards} from '@nestjs/common'
import axios from 'axios'
import { ClerkAuthGuard} from 'apps/common/guards/clerk-auth.guard'


@Controller('/api/onboarding')
@UseGuards(ClerkAuthGuard)
export class onboardingController{

 @Post() 
 async onboard(@Req()req,     @Body() body: { role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT'; schoolCode: string },
){
    const clerkUserId= req.user.sub
    try{

        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/onboarding`,
            {
                role:body.role,
                schoolCode:body.schoolCode
            },{
                headers:{
                    'x-clerk-user-id':clerkUserId,
                }
            }
        ) 
        return response.data
    }catch(error:any){
        console.error(error.response?.data || error.message)
        throw error.response?.data || error

    }

 }  

}
