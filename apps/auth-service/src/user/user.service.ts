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
  
    let user = await this.userModel.findOne({
      clerkUserId: data.clerkUserId,
    });

    if (!user) {
    
      user = new this.userModel(data); 
      user = await user.save();        
      console.log(' USER CREATED:', user);
    } else {
      console.log('ℹ USER ALREADY EXISTS:', user);
    }

    return user;
  } catch (error) {
    console.error(' CREATE USER ERROR:', error.message);
    throw error;
  }
}

    
  async findByClerkId(clerkUserId: string) {
  return this.userModel.findOne({ clerkUserId })
}

async updateByClerkId(clerkUserId: string, updateData: Partial<any>) {
  return this.userModel.findOneAndUpdate({ clerkUserId }, updateData, { new: true })
}

}