import { ClientGrpc, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const AuthGrpcProvider = {
  provide: 'AUTH_GRPC',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5002',
        package: 'auth',
        protoPath: join(process.cwd(),'proto/auth.proto' ),
      },
    }) as unknown as ClientGrpc;
  },
};
