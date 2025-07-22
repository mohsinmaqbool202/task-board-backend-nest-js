import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../typeorm/entities/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly rolesRepo: Repository<Role>
    ) { }

    async findByName(name: string): Promise<Role | null> {
        return await this.rolesRepo.findOne({ where: { name } });
    }
}
