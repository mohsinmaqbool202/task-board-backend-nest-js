import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) { }

    async sendConfirmationEmail(email: string, token: string) {
        const frontendUrl = this.configService.get<string>('FRONTEND_URL');
        const confirmUrl = `${frontendUrl}/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Email Confirmation',
            template: './confirmation',
            context: {
                confirmUrl,
            },
        });
    }
}
