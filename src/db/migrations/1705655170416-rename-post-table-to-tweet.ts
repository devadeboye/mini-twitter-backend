import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenamePostTableToTweet1705655170416 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE post RENAME TO tweet');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE tweet RENAME TO post');
  }
}
