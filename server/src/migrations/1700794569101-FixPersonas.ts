import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPersonas1700794569101 implements MigrationInterface {
    name = 'FixPersonas1700794569101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."rol_estado_enum" AS ENUM('Aprobado', 'Evaluando', 'Rechazado')`);
        await queryRunner.query(`CREATE TABLE "rol" ("id" SERIAL NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_eliminado" TIMESTAMP, "sueldo" integer, "ramaDedicacion" character varying, "fechaIngreso" TIMESTAMP, "estado" "public"."rol_estado_enum", "tipo" character varying NOT NULL, "personaId" integer, "conyugeId" integer, "empresaId" integer, CONSTRAINT "REL_93511e2d34f0352be7e22a137f" UNIQUE ("conyugeId"), CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2549f6841abb640999f7821e64" ON "rol" ("tipo") `);
        await queryRunner.query(`CREATE TYPE "public"."carga_horaria_dia_enum" AS ENUM('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo')`);
        await queryRunner.query(`CREATE TYPE "public"."carga_horaria_tipo_enum" AS ENUM('Semanal', 'Diaria')`);
        await queryRunner.query(`CREATE TABLE "carga_horaria" ("id" SERIAL NOT NULL, "dia" "public"."carga_horaria_dia_enum", "tipo" "public"."carga_horaria_tipo_enum" NOT NULL, "horas" integer NOT NULL, "afiliadoId" integer, CONSTRAINT "PK_bf3fa158bcbf4f5bfb153c946c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rol_hijos_personas" ("rolId" integer NOT NULL, "personasId" integer NOT NULL, CONSTRAINT "PK_d6eab7d3d924dae318cec02296a" PRIMARY KEY ("rolId", "personasId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c80796b7ae5cddd071e3fa8d2" ON "rol_hijos_personas" ("rolId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2b9d558064759789be629a7fa" ON "rol_hijos_personas" ("personasId") `);
        await queryRunner.query(`ALTER TABLE "personas" DROP CONSTRAINT "UQ_a2651a5f32e71b732556d1c5dcc"`);
        await queryRunner.query(`ALTER TABLE "personas" RENAME COLUMN "dni" TO "nroDocumento"`);
        await queryRunner.query(`ALTER TABLE "personas" ALTER COLUMN "nroDocumento" TYPE character varying USING "nroDocumento"::character varying`);
        await queryRunner.query(`ALTER TABLE "personas" ADD CONSTRAINT "UQ_70064c25507dec891281372e3ba" UNIQUE ("nroDocumento")`);
        await queryRunner.query(`ALTER TABLE "personas" ADD "tipoDocumento" character varying NOT NULL DEFAULT 'DNI'`);
        await queryRunner.query(`ALTER TABLE "rol" ADD CONSTRAINT "FK_b799e71a3ecd5af9da9f47cecbc" FOREIGN KEY ("personaId") REFERENCES "personas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol" ADD CONSTRAINT "FK_93511e2d34f0352be7e22a137ff" FOREIGN KEY ("conyugeId") REFERENCES "personas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol" ADD CONSTRAINT "FK_eb90355261ca51ee187d59925b5" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carga_horaria" ADD CONSTRAINT "FK_7c2d630def2b1de01323e7ed4c0" FOREIGN KEY ("afiliadoId") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol_hijos_personas" ADD CONSTRAINT "FK_0c80796b7ae5cddd071e3fa8d21" FOREIGN KEY ("rolId") REFERENCES "rol"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rol_hijos_personas" ADD CONSTRAINT "FK_d2b9d558064759789be629a7fa1" FOREIGN KEY ("personasId") REFERENCES "personas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol_hijos_personas" DROP CONSTRAINT "FK_d2b9d558064759789be629a7fa1"`);
        await queryRunner.query(`ALTER TABLE "rol_hijos_personas" DROP CONSTRAINT "FK_0c80796b7ae5cddd071e3fa8d21"`);
        await queryRunner.query(`ALTER TABLE "carga_horaria" DROP CONSTRAINT "FK_7c2d630def2b1de01323e7ed4c0"`);
        await queryRunner.query(`ALTER TABLE "rol" DROP CONSTRAINT "FK_eb90355261ca51ee187d59925b5"`);
        await queryRunner.query(`ALTER TABLE "rol" DROP CONSTRAINT "FK_93511e2d34f0352be7e22a137ff"`);
        await queryRunner.query(`ALTER TABLE "rol" DROP CONSTRAINT "FK_b799e71a3ecd5af9da9f47cecbc"`);
        await queryRunner.query(`ALTER TABLE "personas" DROP COLUMN "tipoDocumento"`);
        await queryRunner.query(`ALTER TABLE "personas" DROP CONSTRAINT "UQ_70064c25507dec891281372e3ba"`);
        await queryRunner.query(`ALTER TABLE "personas" DROP COLUMN "nroDocumento"`);
        await queryRunner.query(`ALTER TABLE "personas" ADD "dni" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personas" ADD CONSTRAINT "UQ_a2651a5f32e71b732556d1c5dcc" UNIQUE ("dni")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2b9d558064759789be629a7fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c80796b7ae5cddd071e3fa8d2"`);
        await queryRunner.query(`DROP TABLE "rol_hijos_personas"`);
        await queryRunner.query(`DROP TABLE "carga_horaria"`);
        await queryRunner.query(`DROP TYPE "public"."carga_horaria_tipo_enum"`);
        await queryRunner.query(`DROP TYPE "public"."carga_horaria_dia_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2549f6841abb640999f7821e64"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TYPE "public"."rol_estado_enum"`);
    }

}
