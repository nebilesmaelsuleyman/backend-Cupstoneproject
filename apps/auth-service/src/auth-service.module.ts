import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import {ClerkWebhookController} from './webhook/webhook.controller'
@Module({
 imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/auth_db'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserController,ClerkWebhookController],
  providers: [UserService],
})
export class AuthServiceModule {}
