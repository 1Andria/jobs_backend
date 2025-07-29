import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { CompanySchema } from 'src/company/schema/company.schema';
import { JobSchema } from 'src/jobs/schema/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: UserSchema, name: 'user' }]),
    MongooseModule.forFeature([{ schema: CompanySchema, name: 'company' }]),
    MongooseModule.forFeature([{ schema: JobSchema, name: 'job' }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
