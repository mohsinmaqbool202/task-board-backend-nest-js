import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RoleModule } from 'src/role/role.module';
import { UsersModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrganizationModule } from 'src/organization/organization.module';
import { IsEmailUniqueConstraint } from '../common/validators/is-email-unique.validator';
import { MailModule } from 'src/mail/mail.module';


@Module({
  imports: [
    RoleModule,
    UsersModule,
    OrganizationModule,
    MailModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRES_IN', '3600s'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
