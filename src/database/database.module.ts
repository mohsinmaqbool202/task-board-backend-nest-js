import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get('DB_USERNAME'),
                password: config.get('DB_PASSWORD'),
                database: config.get('DB_DATABASE'),
                entities: [__dirname + '/../typeorm/entities/**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/../migrations/*{.ts,.js}'],
                synchronize: false,
                migrationsRun: true,
            })
        })
    ]
})
export class DatabaseModule { }
