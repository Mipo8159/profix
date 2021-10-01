import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async sendConfirmationMail(
    receiver: string,
    activationLink: string,
  ): Promise<void> {
    try {
      await this.mailer.sendMail({
        to: receiver,
        from: process.env.GMAIL_USER,
        subject: 'ექაუნთის გააქტიურება ✔',
        text: '',
        html: `
          <div>
            <h3>ექაუნთის გასააქტიურებლად გადადით ბმულზე</h3>
            <a href="${activationLink}">${activationLink}</a>
          </div>
        `,
      });
    } catch (err) {
      throw new HttpException('error, mail not sent', HttpStatus.BAD_REQUEST);
    }
  }

  async forgottenPasswordMail(receiver: string, forgottenPasswordLink: string) {
    try {
      await this.mailer.sendMail({
        to: receiver,
        from: process.env.GMAIL_USER,
        subject: 'პაროლის აღდგენა',
        text: '',
        html: `
          <div>
            <h3>პაროლის აღსადგენად გადადით ბმულზე</h3>
            <a href="${forgottenPasswordLink}">${forgottenPasswordLink}</a>
          </div>
        `,
      });
    } catch (error) {
      throw new HttpException('error, mail not sent', HttpStatus.BAD_REQUEST);
    }
  }
}
