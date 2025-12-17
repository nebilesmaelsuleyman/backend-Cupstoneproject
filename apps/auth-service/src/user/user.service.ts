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
    async createUser(data:any){
        return this.userModel.create(data)
    }
    async updateByClerkId(clerkUserId:string,data:any){
        return this.userModel.findByIdAndUpdate({ clerkUserId }, data,{new:true})
    }
}