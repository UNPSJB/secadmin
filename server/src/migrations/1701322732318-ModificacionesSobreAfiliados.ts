import { MigrationInterface, QueryRunner } from "typeorm";

export class ModificacionesSobreAfiliados1701322732318 implements MigrationInterface {
    name = 'ModificacionesSobreAfiliados1701322732318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol" ADD "cargaHorariaTipo" character varying`);
        await queryRunner.query(`ALTER TABLE "rol" ADD "cargaHorariaHoras" integer`);
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "tipoDocumento" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "tipoDocumento" SET DEFAULT 'DNI'`);
        await queryRunner.query(`ALTER TABLE "rol" DROP COLUMN "cargaHorariaHoras"`);
        await queryRunner.query(`ALTER TABLE "rol" DROP COLUMN "cargaHorariaTipo"`);
    }

}
