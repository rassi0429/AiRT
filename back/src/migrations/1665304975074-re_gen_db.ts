import {MigrationInterface, QueryRunner} from "typeorm";

export class reGenDb1665304975074 implements MigrationInterface {
    name = 'reGenDb1665304975074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_info\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(255) NOT NULL, \`name\` text NOT NULL, \`twitterId\` varchar(255) NOT NULL, \`neosId\` varchar(255) NOT NULL DEFAULT '', \`twitterImage\` text NOT NULL, UNIQUE INDEX \`IDX_273a06d6cdc2085ee1ce7638b2\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`thumbnail\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`comment\` text NOT NULL, \`createDate\` datetime NOT NULL, UNIQUE INDEX \`IDX_723fa50bf70dcfd06fb5a44d4f\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo_tags_tag\` (\`photoId\` int NOT NULL, \`tagId\` int NOT NULL, INDEX \`IDX_abc691581585594116ae7254bf\` (\`photoId\`), INDEX \`IDX_a74f4c3885bff109e0f691f19f\` (\`tagId\`), PRIMARY KEY (\`photoId\`, \`tagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`photo_tags_tag\` ADD CONSTRAINT \`FK_abc691581585594116ae7254bfe\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`photo_tags_tag\` ADD CONSTRAINT \`FK_a74f4c3885bff109e0f691f19fd\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo_tags_tag\` DROP FOREIGN KEY \`FK_a74f4c3885bff109e0f691f19fd\``);
        await queryRunner.query(`ALTER TABLE \`photo_tags_tag\` DROP FOREIGN KEY \`FK_abc691581585594116ae7254bfe\``);
        await queryRunner.query(`DROP INDEX \`IDX_a74f4c3885bff109e0f691f19f\` ON \`photo_tags_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_abc691581585594116ae7254bf\` ON \`photo_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`photo_tags_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_723fa50bf70dcfd06fb5a44d4f\` ON \`photo\``);
        await queryRunner.query(`DROP TABLE \`photo\``);
        await queryRunner.query(`DROP TABLE \`tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_273a06d6cdc2085ee1ce7638b2\` ON \`user_info\``);
        await queryRunner.query(`DROP TABLE \`user_info\``);
    }

}
