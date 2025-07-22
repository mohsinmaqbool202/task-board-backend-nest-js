import { DataSource } from "typeorm";
import { RoleEnum } from "../../constants/role.enum";
import { Role } from '../../typeorm/entities/role.entity';

export const seedRoles = async (dataSource: DataSource) => {
    const roleRepo = dataSource.getRepository(Role);

    const roles = [RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.MEMBER];

    for (const name of roles) {
        const existing = await roleRepo.findOne({ where: { name } });
        
        if (!existing) {
            const role = roleRepo.create({ name });
            await roleRepo.save(role);
        }
    }

    console.log('✅ Roles seeded successfully.');
};