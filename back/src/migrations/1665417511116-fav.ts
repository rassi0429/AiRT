import {MigrationInterface, QueryRunner} from "typeorm";

export class fav1665417511116 implements MigrationInterface {
    name = 'fav1665417511116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`photo_fav_user_user_info\` (\`photoId\` int NOT NULL, \`userInfoId\` int NOT NULL, INDEX \`IDX_f959ad2f78388fed43c6f35824\` (\`photoId\`), INDEX \`IDX_a78a4b31b1f53ce84ef21e631f\` (\`userInfoId\`), PRIMARY KEY (\`photoId\`, \`userInfoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`photo\` CHANGE \`rawMetadata\` \`rawMetadata\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`photo_fav_user_user_info\` ADD CONSTRAINT \`FK_f959ad2f78388fed43c6f358249\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`photo_fav_user_user_info\` ADD CONSTRAINT \`FK_a78a4b31b1f53ce84ef21e631f4\` FOREIGN KEY (\`userInfoId\`) REFERENCES \`user_info\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo_fav_user_user_info\` DROP FOREIGN KEY \`FK_a78a4b31b1f53ce84ef21e631f4\``);
        await queryRunner.query(`ALTER TABLE \`photo_fav_user_user_info\` DROP FOREIGN KEY \`FK_f959ad2f78388fed43c6f358249\``);
        await queryRunner.query(`ALTER TABLE \`photo\` CHANGE \`rawMetadata\` \`rawMetadata\` longtext NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`DROP INDEX \`IDX_a78a4b31b1f53ce84ef21e631f\` ON \`photo_fav_user_user_info\``);
        await queryRunner.query(`DROP INDEX \`IDX_f959ad2f78388fed43c6f35824\` ON \`photo_fav_user_user_info\``);
        await queryRunner.query(`DROP TABLE \`photo_fav_user_user_info\``);
    }

}
