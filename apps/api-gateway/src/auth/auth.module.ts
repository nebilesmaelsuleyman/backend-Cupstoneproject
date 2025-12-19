import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClerkAuthGuard } from '../../../common/guards/clerk-auth.guard';
import { AuthGrpcProvider } from './auth-grpc.provider';
import {AuthService} from './auth.service'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',  
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(process.cwd(), 'proto/auth.proto'),
          url: 'localhost:5002',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthGrpcProvider, ClerkAuthGuard, AuthService],
})
export class AuthModule {}
