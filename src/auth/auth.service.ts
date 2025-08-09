import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';
import { Company } from 'src/company/schema/company.schema';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { User } from 'src/users/schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('company') private readonly companyModel: Model<Company>,
    @InjectModel('user') private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private emailSenderService: EmailSenderService,
  ) {}

  async companySignUp({
    country,
    email,
    industry,
    name,
    password,
  }: CreateCompanyDto) {
    const existCompany = await this.companyModel.findOne({ email });
    if (existCompany)
      throw new BadRequestException(
        'Company already exists with this email try another one',
      );

    const hashedPass = await bcrypt.hash(password, 10);
    const newCompany = await this.companyModel.create({
      country,
      email,
      industry,
      isApproved: false,
      name,
      password: hashedPass,
    });

    const token = this.jwtService.sign(
      { id: newCompany._id },
      { expiresIn: '1h' },
    );

    const inviteLink = `${process.env.FRONT_URL}/auth/verify-company-account?token=${token}`;

    await this.emailSenderService.sendInviteLink(email, inviteLink);

    return {
      message:
        'Invitation link sent to company email please check and verify your account',
    };
  }
}
