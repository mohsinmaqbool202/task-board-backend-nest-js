import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUsersTable1753269758465 implements MigrationInterface {
    name = 'AlterUsersTable1753269758465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
    }

}
