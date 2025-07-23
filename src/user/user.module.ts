import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { MailModule } from 'src/mail/mail.module';
import { UserController } from './user.controller';
import { User } from 'src/typeorm/entities/user.entity';
import { JwtConfigModule } from 'src/common/modules/jwt-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    MailModule,
    JwtConfigModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController], 
})
export class UsersModule {}
