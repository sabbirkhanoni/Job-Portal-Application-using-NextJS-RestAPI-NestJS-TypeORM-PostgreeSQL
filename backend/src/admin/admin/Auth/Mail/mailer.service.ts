import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailServiceProvider {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(to: string, subject: string, text: string) {
    await this.mailService.sendMail({
      to,
      subject,
      text,
    });
  }
}