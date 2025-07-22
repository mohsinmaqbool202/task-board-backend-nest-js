import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { seedRoles } from './seeders/role.seeder';

AppDataSource.initialize()
    .then(async () => {
        await seedRoles(AppDataSource);
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    });