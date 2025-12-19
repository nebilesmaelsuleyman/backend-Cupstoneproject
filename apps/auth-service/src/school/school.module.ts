import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { School, SchoolSchema } from './school.schema'
import { SchoolsService } from './school.service'
import { SchoolsController } from './school.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  providers: [SchoolsService],
  controllers: [SchoolsController],
  exports: [SchoolsService],
})
export class SchoolsModule {}
