import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregarUnicoAlCodigoAula1697939657048 implements MigrationInterface {
    name = 'AgregarSoftDeleteAlAula1697939657048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aulas" ADD CONSTRAINT "UQ_fc3ee436955d3fa34bd5f362b64" UNIQUE ("codigo_aula")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aulas" DROP CONSTRAINT "UQ_fc3ee436955d3fa34bd5f362b64"`);
    }

}
