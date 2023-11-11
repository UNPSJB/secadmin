import { Localidades } from "src/localidades/entities/localidades.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn } from "typeorm"

@Entity('empresas')
export class Empresa {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique:true
    })
    cuit:string

    @Column()
    razon_social:string

    @Column()
    direccion:string

    @ManyToOne(() => Localidades)
    localidad:Localidades

    @DeleteDateColumn()
    fecha_eliminacion: Date

}
