import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/user.schema';
import { CompanySchema } from './schema/company.schema';
import { JobSchema } from 'src/jobs/schema/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: UserSchema, name: 'user' }]),
    MongooseModule.forFeature([{ schema: CompanySchema, name: 'company' }]),
    MongooseModule.forFeature([{ schema: JobSchema, name: 'job' }]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
