import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearEmpresas1699311780532 implements MigrationInterface {
    name = 'CrearEmpresas1699311780532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresas" RENAME COLUMN "cuil" TO "cuit"`);
        await queryRunner.query(`ALTER TABLE "empresas" RENAME CONSTRAINT "UQ_8783b8f0afb4142d588bcb8b32f" TO "UQ_d44c02e8554f6356ac1d5c059e7"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresas" RENAME CONSTRAINT "UQ_d44c02e8554f6356ac1d5c059e7" TO "UQ_8783b8f0afb4142d588bcb8b32f"`);
        await queryRunner.query(`ALTER TABLE "empresas" RENAME COLUMN "cuit" TO "cuil"`);
    }

}
