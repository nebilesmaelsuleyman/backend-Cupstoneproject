import{Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

@Injectable()
export class UserService{
    constructor(
        @InjectModel('User') private userModel:Model<any>
    ){}
    
    async getByClerkId(clerkUserId:string){
        return this.userModel.findOne({clerkUserId})
    }

   async createUser(data: any) {
  try {
    // check if user already exists
    let user = await this.userModel.findOne({
      clerkUserId: data.clerkUserId,
    });

    if (!user) {
      // create a new user
      user = new this.userModel(data); // ⚠️ use model instance
      user = await user.save();        // ⚠️ MUST call save()
      console.log('🟢 USER CREATED:', user);
    } else {
      console.log('ℹ️ USER ALREADY EXISTS:', user);
    }

    return user;
  } catch (error) {
    console.error('❌ CREATE USER ERROR:', error.message);
    throw error;
  }
}

    
    async updateByClerkId(clerkUserId:string,data:any){
        return this.userModel.findByIdAndUpdate({ clerkUserId }, data,{new:true})
    }
}