import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/user.schema';
import { CompanySchema } from 'src/company/schema/company.schema';
import { JobSchema } from 'src/jobs/schema/job.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';

@Module({
  imports: [
    EmailSenderModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    MongooseModule.forFeature([{ schema: UserSchema, name: 'user' }]),
    MongooseModule.forFeature([{ schema: CompanySchema, name: 'company' }]),
    MongooseModule.forFeature([{ schema: JobSchema, name: 'job' }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
