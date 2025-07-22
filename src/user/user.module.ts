import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { User } from 'src/typeorm/entities/user.entity';
import { IsEmailUniqueConstraint } from '../common/validators/is-email-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}
