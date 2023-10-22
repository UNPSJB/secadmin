import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('localidades')
export class Localidades {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre:string

    @Column()
    codigo_postal:number
}
