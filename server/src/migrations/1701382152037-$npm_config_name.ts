import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1701382152037 implements MigrationInterface {
    name = ' $npmConfigName1701382152037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol" ADD "especialidad" character varying`);
        await queryRunner.query(`ALTER TABLE "rol" ADD "honorarios" integer`);
        await queryRunner.query(`ALTER TABLE "rol" ADD "descripcion" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "rol" DROP COLUMN "honorarios"`);
        await queryRunner.query(`ALTER TABLE "rol" DROP COLUMN "especialidad"`);
    }

}
