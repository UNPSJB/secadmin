import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregarSofDeleteAempresa1699316039962 implements MigrationInterface {
    name = 'AgregarSofDeleteAempresa1699316039962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresas" ADD "fecha_eliminacion" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresas" DROP COLUMN "fecha_eliminacion"`);
    }

}
