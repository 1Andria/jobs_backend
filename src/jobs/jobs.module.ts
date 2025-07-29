import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/user.schema';
import { CompanySchema } from 'src/company/schema/company.schema';
import { JobSchema } from './schema/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: UserSchema, name: 'user' }]),
    MongooseModule.forFeature([{ schema: CompanySchema, name: 'company' }]),
    MongooseModule.forFeature([{ schema: JobSchema, name: 'job' }]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
