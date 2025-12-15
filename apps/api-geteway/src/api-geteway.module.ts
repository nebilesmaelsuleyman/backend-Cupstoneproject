import { Module } from '@nestjs/common';
import { ApiGetewayController } from './api-geteway.controller';
import { ApiGetewayService } from './api-geteway.service';
import {join} from 'path'
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ClientsModule.register([
      {
        name:'AUTH_SERVICE',
        transport:Transport.GRPC,
        options:{
          package:'auth',
          protoPath:join(process.cwd(),'./proto/auth.proto'),
          url:'localhost:5001'
        }
      }
    ])
  ],
  controllers: [ApiGetewayController],
  providers: [ApiGetewayService],
})
export class ApiGetewayModule {}
