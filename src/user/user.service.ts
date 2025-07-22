import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepo.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    return await this.usersRepo.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    await this.usersRepo.update(id, data);
  }
}
