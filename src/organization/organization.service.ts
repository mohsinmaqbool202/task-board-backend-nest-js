import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from '../typeorm/entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationsRepo: Repository<Organization>,
    ) {}

    async create(name: string): Promise<Organization> {
        const org = this.organizationsRepo.create({ name });
        return await this.organizationsRepo.save(org);
    }
}
