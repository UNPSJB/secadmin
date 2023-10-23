import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregarUsuario1698024779521 implements MigrationInterface {
    name = 'AgregarUsuario1698024779521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_eliminado" TIMESTAMP, "personaId" integer, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "REL_aa5c122ee9bc3ce4daf6af75dd" UNIQUE ("personaId"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personas" ADD "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "personas" ADD "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "personas" ADD "fecha_eliminado" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_aa5c122ee9bc3ce4daf6af75dde" FOREIGN KEY ("personaId") REFERENCES "personas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_aa5c122ee9bc3ce4daf6af75dde"`);
        await queryRunner.query(`ALTER TABLE "personas" DROP COLUMN "fecha_eliminado"`);
        await queryRunner.query(`ALTER TABLE "personas" DROP COLUMN "fecha_actualizacion"`);
        await queryRunner.query(`ALTER TABLE "personas" DROP COLUMN "fecha_creacion"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
