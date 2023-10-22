import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearLocalidades1697928643848 implements MigrationInterface {
    name = 'CrearLocalidades1697928643848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "localidades" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "codigo_postal" integer NOT NULL, CONSTRAINT "PK_5bdb0ef5463491e8f3259dd1ae1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "localidades"`);
    }
}
