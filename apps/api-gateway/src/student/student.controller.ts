// api-gateway/src/student/student.controller.ts
import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtGuard)
  @Get()
  getStudents(@Headers('authorization') authHeader: string) {
    return this.studentService.getStudents(authHeader);
  }
}
