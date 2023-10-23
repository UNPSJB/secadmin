import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('nacionalidades')
export class Nacionalidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_es: string

    @Column()
    nombre_en: string
}