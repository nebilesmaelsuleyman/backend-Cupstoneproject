import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class StudentService implements OnModuleInit {
  private studentGrpcService: any;
  private client: ClientGrpc;

  onModuleInit() {
    this.studentGrpcService =
      this.client.getService<any>('StudentService');
  }

  getStudents(authHeader: string) {
    return this.studentGrpcService.GetStudents({
      authorization: authHeader,
    });
  }
}
