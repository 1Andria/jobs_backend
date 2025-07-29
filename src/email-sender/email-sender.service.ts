import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class EmailSenderService {
  constructor(private mailerService: MailerService) {}

  async sendOTPCode(to: string, otpCode: number) {
    const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f8fc; padding: 40px 0;">
      <table align="center" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);">
        <tr>
          <td style="background-color: #2a4365; padding: 24px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">SWIPT Verification Code</h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px; color: #333;">
            <p style="font-size: 16px; margin: 0;">Hello,</p>
            <p style="font-size: 16px; margin: 16px 0;">
              To continue using <strong>SWIPT</strong>, please use the following verification code. It is valid for <strong>3 minutes</strong>:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 6px; background-color: #edf2f7; padding: 14px 32px; border-radius: 8px; color: #2a4365;">
                ${otpCode}
              </span>
            </div>
            <p style="font-size: 14px; color: #666;">
              If you did not request this code, please ignore this message.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f7fafc; padding: 16px; text-align: center; font-size: 12px; color: #999;">
            &copy; 2025 SWIPT. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  `;

    try {
      await this.mailerService.sendMail({
        to,
        from: 'SWIPT <no-reply@swipt.ge>',
        subject: 'Your SWIPT Verification Code',
        html: htmlTemplate,
      });
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new BadRequestException('Failed to send OTP email');
    }
  }

  async sendInviteLink(email: string, link: string) {
    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #eef2f7; padding: 40px 0;">
      <table align="center" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); overflow: hidden;">
        <tr>
          <td style="background-color: #2a4365; padding: 24px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">You're Invited to Join a Company on SWIPT</h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px; color: #333;">
            <p style="font-size: 16px;">Hello,</p>
            <p style="font-size: 16px; margin-top: 12px;">
              You've been invited to join a company team on <strong>SWIPT</strong>.
            </p>
            <p style="font-size: 16px;">
              Click the button below to accept the invitation and complete your account setup:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${link}" style="background-color: #2a4365; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">
                Accept Invitation
              </a>
            </div>
            <p style="font-size: 14px; color: #888;">
              This link will expire in 1 hour. If you did not expect this email, you can safely ignore it.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f7fafc; padding: 16px; text-align: center; font-size: 12px; color: #999;">
            &copy; 2025 SWIPT. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  `;

    await this.mailerService.sendMail({
      to: email,
      from: 'SWIPT <no-reply@swipt.ge>',
      subject: 'Company Invitation – Join via SWIPT',
      html,
    });
  }
}
