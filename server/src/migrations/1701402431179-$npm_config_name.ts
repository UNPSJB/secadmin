import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1701402431179 implements MigrationInterface {
    name = ' $npmConfigName1701402431179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "direccion" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "direccion" SET NOT NULL`);
    }

}
