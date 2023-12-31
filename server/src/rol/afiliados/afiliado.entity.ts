import { ChildEntity, Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Rol } from "../rol.entity";
import { TipoCargaHoraria } from "./cargaHoraria.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Empresa } from "src/empresa/entities/empresa.entity";

export enum EstadoAfiliacion {
    APROBADO = 'Aprobado',
    EVALUANDO = 'Evaluando',
    RECHAZADO = 'Rechazado'
}

@ChildEntity()
export class Afiliado extends Rol {
    @Column()
    sueldo: number

    @Column()
    ramaDedicacion: string

    @Column()
    cargaHorariaTipo:TipoCargaHoraria;

    @Column()
    cargaHorariaHoras: number;

    @Column()
    fechaIngreso: Date; 


    @Column({
        type:'enum',
        enum: EstadoAfiliacion,
        nullable: true,
    })
    estado: EstadoAfiliacion;


    @OneToOne(() => Persona)
    @JoinColumn()
    conyuge: Persona;

    @ManyToMany(() => Persona)
    @JoinTable()
    hijos: Persona[];

    @ManyToOne(() => Empresa)
    empresa: Empresa;

}