import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClerkAuthGuard } from '../../../common/guards/clerk-auth.guard';
import {AuthGrpcService} from './auth.grpc.service'
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
  providers: [AuthGrpcService, ClerkAuthGuard,],
})
export class AuthModule {}
