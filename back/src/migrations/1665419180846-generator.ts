import {MigrationInterface, QueryRunner} from "typeorm";

export class generator1665419180846 implements MigrationInterface {
    name = 'generator1665419180846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`generator\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`generator\``);
    }

}
