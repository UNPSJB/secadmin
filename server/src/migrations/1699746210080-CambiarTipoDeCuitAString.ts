import { MigrationInterface, QueryRunner } from "typeorm";

export class CambiarTipoDeCuitAString1699746210080 implements MigrationInterface {
    name = 'CambiarTipoDeCuitAString1699746210080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresas" DROP CONSTRAINT "UQ_d44c02e8554f6356ac1d5c059e7"`);
        await queryRunner.query(`ALTER TABLE "empresas" DROP COLUMN "cuit"`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD "cuit" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD CONSTRAINT "UQ_d44c02e8554f6356ac1d5c059e7" UNIQUE ("cuit")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresas" DROP CONSTRAINT "UQ_d44c02e8554f6356ac1d5c059e7"`);
        await queryRunner.query(`ALTER TABLE "empresas" DROP COLUMN "cuit"`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD "cuit" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD CONSTRAINT "UQ_d44c02e8554f6356ac1d5c059e7" UNIQUE ("cuit")`);
    }

}
