import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregarListaDeEspera1701661340022 implements MigrationInterface {
    name = 'AgregarListaDeEspera1701661340022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol" ADD "cursoId" integer`);
        await queryRunner.query(`ALTER TABLE "rol" ADD CONSTRAINT "FK_13b2675c311e846e931c68a7d29" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol" DROP CONSTRAINT "FK_13b2675c311e846e931c68a7d29"`);
        await queryRunner.query(`ALTER TABLE "rol" DROP COLUMN "cursoId"`);
    }

}
