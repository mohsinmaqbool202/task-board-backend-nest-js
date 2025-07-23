import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { User } from 'src/typeorm/entities/user.entity';
import { IsEmailUniqueConstraint } from '../common/validators/is-email-unique.validator';
import { UserController } from './user.controller';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController], 
})
export class UsersModule {}
