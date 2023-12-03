import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregarDictado1701560353806 implements MigrationInterface {
    name = 'AgregarDictado1701560353806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dictados" ("id" SERIAL NOT NULL, "precio" integer NOT NULL, "precio_afiliado" integer NOT NULL, "capacidad" integer NOT NULL, "fecha_inicio" TIMESTAMP NOT NULL, "fecha_fin" TIMESTAMP NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_eliminacion" TIMESTAMP, "cursoId" integer, "profesorId" integer, CONSTRAINT "PK_c727cd0a7c9680e567c9bcc6321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "fecha_nacimiento" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "estado_civil" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dictados" ADD CONSTRAINT "FK_6bb0721bab28b9204b7f1636ca1" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dictados" ADD CONSTRAINT "FK_ac1ecc5c45858124ca54bad944d" FOREIGN KEY ("profesorId") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dictados" DROP CONSTRAINT "FK_ac1ecc5c45858124ca54bad944d"`);
        await queryRunner.query(`ALTER TABLE "dictados" DROP CONSTRAINT "FK_6bb0721bab28b9204b7f1636ca1"`);
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "estado_civil" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "fecha_nacimiento" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "dictados"`);
    }

}
