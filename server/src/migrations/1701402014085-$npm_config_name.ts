import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1701402014085 implements MigrationInterface {
    name = ' $npmConfigName1701402014085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "cuil" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personas" DROP CONSTRAINT "UQ_1535e499bbd5547ffaea0bd2012"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personas" ADD CONSTRAINT "UQ_1535e499bbd5547ffaea0bd2012" UNIQUE ("cuil")`);
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "cuil" SET NOT NULL`);
    }

}
