import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RoleModule } from 'src/role/role.module';
import { UsersModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';
import { JwtConfigModule } from 'src/common/modules/jwt-config.module';
import { OrganizationModule } from 'src/organization/organization.module';


@Module({
  imports: [
    RoleModule,
    UsersModule,
    OrganizationModule,
    MailModule,
    PassportModule,
    JwtConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
