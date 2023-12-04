import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregarAlumnosaDictado1701646216157 implements MigrationInterface {
    name = 'AgregarAlumnosaDictado1701646216157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol" ADD "dictadoId" integer`);
        await queryRunner.query(`ALTER TABLE "rol" ADD CONSTRAINT "FK_d522748939eafc7f3b525f4c9ad" FOREIGN KEY ("dictadoId") REFERENCES "dictados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol" DROP CONSTRAINT "FK_d522748939eafc7f3b525f4c9ad"`);
        await queryRunner.query(`ALTER TABLE "rol" DROP COLUMN "dictadoId"`);
    }

}
