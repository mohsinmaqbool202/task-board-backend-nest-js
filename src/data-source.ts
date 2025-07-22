import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'mysql',
    // timezone: 'Z',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'task_board',
    entities: ['src/typeorm/entities/**/*{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
    synchronize: false,
})