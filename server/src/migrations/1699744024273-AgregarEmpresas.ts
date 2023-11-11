import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregarEmpresas1699744024273 implements MigrationInterface {
    name = 'AgregarEmpresas1699744024273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "empresas" ("id" SERIAL NOT NULL, "cuit" integer NOT NULL, "razon_social" character varying NOT NULL, "direccion" character varying NOT NULL, "fecha_eliminacion" TIMESTAMP, "localidadId" integer, CONSTRAINT "UQ_d44c02e8554f6356ac1d5c059e7" UNIQUE ("cuit"), CONSTRAINT "PK_ce7b122b37c6499bfd6520873e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD CONSTRAINT "FK_716692d8343af9308ca2c1b0760" FOREIGN KEY ("localidadId") REFERENCES "localidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresas" DROP CONSTRAINT "FK_716692d8343af9308ca2c1b0760"`);
        await queryRunner.query(`DROP TABLE "empresas"`);
    }

}
