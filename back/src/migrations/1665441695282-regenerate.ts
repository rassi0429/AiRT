import {MigrationInterface, QueryRunner} from "typeorm";

export class regenerate1665441695282 implements MigrationInterface {
    name = 'regenerate1665441695282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_info\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(255) NOT NULL, \`name\` text NOT NULL, \`twitterId\` varchar(255) NOT NULL, \`neosId\` varchar(255) NOT NULL DEFAULT '', \`twitterImage\` text NOT NULL, UNIQUE INDEX \`IDX_273a06d6cdc2085ee1ce7638b2\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`rawMetadata\` longtext NOT NULL, \`nsfw\` tinyint NOT NULL DEFAULT 0, \`comment\` text NOT NULL, \`generator\` text NOT NULL, \`createDate\` datetime NOT NULL, UNIQUE INDEX \`IDX_723fa50bf70dcfd06fb5a44d4f\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`prompt\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo_prompt_prompt\` (\`photoId\` int NOT NULL, \`promptId\` int NOT NULL, INDEX \`IDX_bc003bbb0a9bf5f653c02cb62c\` (\`photoId\`), INDEX \`IDX_91c6777701727604fce4b1a7b4\` (\`promptId\`), PRIMARY KEY (\`photoId\`, \`promptId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo_fav_user_user_info\` (\`photoId\` int NOT NULL, \`userInfoId\` int NOT NULL, INDEX \`IDX_f959ad2f78388fed43c6f35824\` (\`photoId\`), INDEX \`IDX_a78a4b31b1f53ce84ef21e631f\` (\`userInfoId\`), PRIMARY KEY (\`photoId\`, \`userInfoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`photo_prompt_prompt\` ADD CONSTRAINT \`FK_bc003bbb0a9bf5f653c02cb62c0\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`photo_prompt_prompt\` ADD CONSTRAINT \`FK_91c6777701727604fce4b1a7b4e\` FOREIGN KEY (\`promptId\`) REFERENCES \`prompt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo_fav_user_user_info\` ADD CONSTRAINT \`FK_f959ad2f78388fed43c6f358249\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`photo_fav_user_user_info\` ADD CONSTRAINT \`FK_a78a4b31b1f53ce84ef21e631f4\` FOREIGN KEY (\`userInfoId\`) REFERENCES \`user_info\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo_fav_user_user_info\` DROP FOREIGN KEY \`FK_a78a4b31b1f53ce84ef21e631f4\``);
        await queryRunner.query(`ALTER TABLE \`photo_fav_user_user_info\` DROP FOREIGN KEY \`FK_f959ad2f78388fed43c6f358249\``);
        await queryRunner.query(`ALTER TABLE \`photo_prompt_prompt\` DROP FOREIGN KEY \`FK_91c6777701727604fce4b1a7b4e\``);
        await queryRunner.query(`ALTER TABLE \`photo_prompt_prompt\` DROP FOREIGN KEY \`FK_bc003bbb0a9bf5f653c02cb62c0\``);
        await queryRunner.query(`DROP INDEX \`IDX_a78a4b31b1f53ce84ef21e631f\` ON \`photo_fav_user_user_info\``);
        await queryRunner.query(`DROP INDEX \`IDX_f959ad2f78388fed43c6f35824\` ON \`photo_fav_user_user_info\``);
        await queryRunner.query(`DROP TABLE \`photo_fav_user_user_info\``);
        await queryRunner.query(`DROP INDEX \`IDX_91c6777701727604fce4b1a7b4\` ON \`photo_prompt_prompt\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc003bbb0a9bf5f653c02cb62c\` ON \`photo_prompt_prompt\``);
        await queryRunner.query(`DROP TABLE \`photo_prompt_prompt\``);
        await queryRunner.query(`DROP TABLE \`prompt\``);
        await queryRunner.query(`DROP INDEX \`IDX_723fa50bf70dcfd06fb5a44d4f\` ON \`photo\``);
        await queryRunner.query(`DROP TABLE \`photo\``);
        await queryRunner.query(`DROP INDEX \`IDX_273a06d6cdc2085ee1ce7638b2\` ON \`user_info\``);
        await queryRunner.query(`DROP TABLE \`user_info\``);
    }

}
