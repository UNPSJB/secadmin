import { MigrationInterface, QueryRunner } from "typeorm";

export class EliminadoUniqueEndocumento1701577691952 implements MigrationInterface {
    name = 'EliminadoUniqueEndocumento1701577691952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personas" DROP CONSTRAINT "UQ_70064c25507dec891281372e3ba"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personas" ADD CONSTRAINT "UQ_70064c25507dec891281372e3ba" UNIQUE ("nroDocumento")`);
    }

}
