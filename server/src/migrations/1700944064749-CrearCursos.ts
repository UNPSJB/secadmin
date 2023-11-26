import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearCursos1700944064749 implements MigrationInterface {
    name = 'CrearCursos1700944064749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cursos_tipo_curso_enum" AS ENUM('Curso unico', 'Curso por periodo', 'Curso normal')`);
        await queryRunner.query(`CREATE TYPE "public"."cursos_categoria_curso_enum" AS ENUM('Capacitacion', 'Gimnasio Saludable', 'Cultura')`);
        await queryRunner.query(`CREATE TABLE "cursos" ("id" SERIAL NOT NULL, "codigo_curso" character varying NOT NULL, "nombre_curso" character varying NOT NULL, "tipo_curso" "public"."cursos_tipo_curso_enum" NOT NULL, "categoria_curso" "public"."cursos_categoria_curso_enum" NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_eliminacion" TIMESTAMP, CONSTRAINT "UQ_6e23a0c1dc4b46f84b521331026" UNIQUE ("codigo_curso"), CONSTRAINT "PK_391c5a635ef6b4bd0a46cb75653" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "tipoDocumento" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "tipoDocumento" SET DEFAULT 'DNI'`);
        await queryRunner.query(`DROP TABLE "cursos"`);
        await queryRunner.query(`DROP TYPE "public"."cursos_categoria_curso_enum"`);
        await queryRunner.query(`DROP TYPE "public"."cursos_tipo_curso_enum"`);
    }

}
