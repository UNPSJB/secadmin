import { MigrationInterface, QueryRunner } from "typeorm";
import nacionalidades from "./seeds/nacionalidades";

export class CrearPersona1698017847152 implements MigrationInterface {
    name = 'CrearPersona1698017847152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nacionalidades" ("id" SERIAL NOT NULL, "nombre_es" character varying NOT NULL, "nombre_en" character varying NOT NULL, CONSTRAINT "PK_e1324f3e7393cc58ca3238ad2d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "personas" ("id" SERIAL NOT NULL, "dni" integer NOT NULL, "cuil" character varying NOT NULL, "nombre" character varying(100) NOT NULL, "apellido" character varying(100) NOT NULL, "telefono" character varying, "direccion" character varying NOT NULL, "fecha_nacimiento" TIMESTAMP NOT NULL, "estado_civil" character varying NOT NULL, "nacionalidadId" integer, "localidadId" integer, CONSTRAINT "UQ_a2651a5f32e71b732556d1c5dcc" UNIQUE ("dni"), CONSTRAINT "UQ_1535e499bbd5547ffaea0bd2012" UNIQUE ("cuil"), CONSTRAINT "PK_714aa5d028f8f3e6645e971cecd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personas" ADD CONSTRAINT "FK_ec3fa4c41251702657528bc81b1" FOREIGN KEY ("nacionalidadId") REFERENCES "nacionalidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personas" ADD CONSTRAINT "FK_596c187600c833ece05293132a0" FOREIGN KEY ("localidadId") REFERENCES "localidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);


        const values = nacionalidades.countries
            .map(nacionalidad => `('${nacionalidad.es_name}', '${nacionalidad.name}')`)
            .join(',\n');

        const query = `
            INSERT INTO nacionalidades (nombre_es, nombre_en)
            VALUES ${values}
        `
        await queryRunner.query(query);        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personas" DROP CONSTRAINT "FK_596c187600c833ece05293132a0"`);
        await queryRunner.query(`ALTER TABLE "personas" DROP CONSTRAINT "FK_ec3fa4c41251702657528bc81b1"`);
        await queryRunner.query(`DROP TABLE "personas"`);
        await queryRunner.query(`DROP TABLE "nacionalidades"`);
    }

}
