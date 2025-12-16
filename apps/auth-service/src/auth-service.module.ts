import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { DatabaseModule } from './database/mongoose.module';

@Module({
 imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AuthServiceModule {}
