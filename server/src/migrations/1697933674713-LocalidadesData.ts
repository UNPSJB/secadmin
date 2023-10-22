import { MigrationInterface, QueryRunner } from "typeorm"
const fs = require('fs')
const path = require('path')

export class LocalidadesData1697933674713 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const csvData = fs.readFileSync(path.join(__dirname,`seeds`,`Codigos-Postales-Argentina.csv`), 'utf-8');
        const lines = csvData.split('\n');

        // Procesar las líneas restantes
        const rows = lines.slice(1).map(line => {
            const values = line.split(',');
            // Escapar las comillas simples para evitar errores de SQL
            const escapedValues = values.map(value => `'${value.replace(/'/g, "''")}'`);
            return `(${escapedValues.join(', ')})`;
        });

        const insertQuery = `
            INSERT INTO localidades (codigo_postal,nombre)
            VALUES
            ${rows.join(',\n    ')}
        `;

        await queryRunner.query(insertQuery);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
