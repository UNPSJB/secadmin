import { Localidades } from "src/localidades/entities/localidades.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn } from "typeorm"

@Entity('aulas')
export class Aula {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique:true
    })
    codigo_aula:string

    @Column()
    capacidad:number

    @Column()
    direccion:string

    @ManyToOne(() => Localidades)
    localidad:Localidades

    @DeleteDateColumn()
    fecha_eliminacion: Date
}
