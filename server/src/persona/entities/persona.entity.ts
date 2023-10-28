import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { Nacionalidad } from "./nacionalidades.entity";
import { EstadoCivil } from "./estados-civiles.enum";
import { Localidades } from "src/localidades/entities/localidades.entity";

@Entity('personas')
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    dni: number;


    @Column({
        unique: true
    })
    cuil: string;


    @Column({
        length: 100
    })
    nombre: string


    @Column({
        length: 100
    })
    apellido: string;


    @Column({
        nullable: true,
    })
    telefono: string;

    @Column()
    direccion: string;

    @Column()
    fecha_nacimiento: Date;

    @ManyToOne(() => Nacionalidad)
    nacionalidad: Nacionalidad;

    @Column({enum: EstadoCivil})
    estado_civil: EstadoCivil;

    @ManyToOne(() => Localidades)
    localidad: Localidades;

    @OneToOne(() => Persona, (persona) => persona.usuario)
    usuario: Persona;    

    @CreateDateColumn()
    fecha_creacion: Date

    @UpdateDateColumn()
    fecha_actualizacion: Date

    @DeleteDateColumn()
    fecha_eliminado: Date
}