import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import {ClerkWebhookController} from './webhook/webhook.controller'
import { MongoModule } from '@app/database'
import { ConfigModule } from '@nestjs/config'

@Module({
 imports: [
  ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserController,ClerkWebhookController],
  providers: [UserService],
})
export class AuthServiceModule {}
