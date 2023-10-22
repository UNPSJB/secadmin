import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregarSoftDeleteAlAula1697939701208 implements MigrationInterface {
    name = 'AgregarSoftDeleteAlAula1697939701208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aulas" ADD "fecha_eliminacion" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aulas" DROP COLUMN "fecha_eliminacion"`);
    }

}
