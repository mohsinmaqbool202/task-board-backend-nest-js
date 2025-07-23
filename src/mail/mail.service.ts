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

    async sendInvitationEmail(email: string, token: string) {
        const frontendUrl = this.configService.get<string>('FRONTEND_URL');
        const invitationUrl = `${frontendUrl}/auth/set-password?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'You are invited to join TaskBoard',
            template: './invitation',
            context: {
                invitationUrl,
            },
        });
    }

    async sendForgotPasswordEmail(email: string, token: string) {
        const frontendUrl = this.configService.get<string>('FRONTEND_URL');
        const forgotPasswordUrl = `${frontendUrl}/auth/reset-password?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Forgot Password',
            template: './forgot-password',
            context: {
                forgotPasswordUrl,
            },
        });
    }
}
