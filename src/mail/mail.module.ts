import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import * as Handlebars from 'handlebars';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get('SMTP_HOST'),
                    port: config.get<number>('SMTP_PORT'),
                    auth: {
                        user: config.get('SMTP_USER'),
                        pass: config.get('SMTP_PASS'),
                    },
                },
                defaults: {
                    from: `"${config.get('APP_NAME') || 'MyApp'}" <${config.get('FROM_EMAIL')}>`,
                },
                template: {
                    dir: join(__dirname, '..', 'mail', 'templates'),
                    adapter: new HandlebarsAdapter(), // <-- Pass Handlebars instance
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }
