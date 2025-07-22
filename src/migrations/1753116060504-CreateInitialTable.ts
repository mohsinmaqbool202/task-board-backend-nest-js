import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTable1753116060504 implements MigrationInterface {
    name = 'CreateInitialTable1753116060504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`organizations\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email_verified_at\` timestamp NULL, \`organization_id\` varchar(255) NOT NULL, \`role_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_members\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`projectId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`organizationId\` varchar(36) NULL, \`createdById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`boards\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`projectId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task_assignees\` (\`id\` varchar(36) NOT NULL, \`assigned_at\` datetime NOT NULL, \`taskId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`status\` varchar(100) NOT NULL, \`due_date\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`boardId\` varchar(36) NULL, \`createdById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_21a659804ed7bf61eb91688dea7\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_d19892d8f03928e5bfc7313780c\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_08d1346ff91abba68e5a637cfdb\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_eec93fd979bdcf5a0141da324d6\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_f55144dc92df43cd1dad5d29b90\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`boards\` ADD CONSTRAINT \`FK_074efe1a079786d8c076bf00fff\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_assignees\` ADD CONSTRAINT \`FK_8b1600551063c485554bca74c13\` FOREIGN KEY (\`taskId\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_assignees\` ADD CONSTRAINT \`FK_e1f7dbf3fd1b02451882ea7c7b4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_8a75fdea98c72c539a0879cb0d1\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_660898d912c6e71107e9ef8f38d\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_660898d912c6e71107e9ef8f38d\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_8a75fdea98c72c539a0879cb0d1\``);
        await queryRunner.query(`ALTER TABLE \`task_assignees\` DROP FOREIGN KEY \`FK_e1f7dbf3fd1b02451882ea7c7b4\``);
        await queryRunner.query(`ALTER TABLE \`task_assignees\` DROP FOREIGN KEY \`FK_8b1600551063c485554bca74c13\``);
        await queryRunner.query(`ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_074efe1a079786d8c076bf00fff\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_f55144dc92df43cd1dad5d29b90\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_eec93fd979bdcf5a0141da324d6\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_08d1346ff91abba68e5a637cfdb\``);
        await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_d19892d8f03928e5bfc7313780c\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_21a659804ed7bf61eb91688dea7\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
        await queryRunner.query(`DROP TABLE \`task_assignees\``);
        await queryRunner.query(`DROP TABLE \`boards\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP TABLE \`project_members\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`organizations\``);
    }

}
