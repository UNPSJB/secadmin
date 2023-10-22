import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearAulas1697937773348 implements MigrationInterface {
    name = 'CrearAulas1697937773348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aulas" ("id" SERIAL NOT NULL, "codigo_aula" character varying NOT NULL, "capacidad" integer NOT NULL, "direccion" character varying NOT NULL, "localidadId" integer, CONSTRAINT "PK_1c24faf8a7f2309f6b44679ee91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aulas" ADD CONSTRAINT "FK_17f271a9c30d9da01f0f1b7f571" FOREIGN KEY ("localidadId") REFERENCES "localidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aulas" DROP CONSTRAINT "FK_17f271a9c30d9da01f0f1b7f571"`);
        await queryRunner.query(`DROP TABLE "aulas"`);
    }

}
