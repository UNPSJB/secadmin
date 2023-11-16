import { Column, Entity, ManyToOne } from "typeorm";
import { Afiliado } from "./afiliado.entity";

export enum CargaHorariaDias {
    LUNES = 'Lunes',
    MARTES = 'Martes',
    MIERCOLES = 'Miercoles',
    JUEVES = 'Jueves',
    VIERNES = 'Viernes',
    SABADO = 'Sabado',
    DOMINGO = 'Domingo'
}

export enum TipoCargaHoraria {
    SEMANAL = 'Semanal',
    DIARIA = 'Diaria'
}

@Entity('carga_horaria')
export class CargaHoraria {
    @ManyToOne(() => Afiliado, (afiliado) => afiliado.cargaHoraria)
    afiliado: Afiliado;

    @Column({
        type:'enum',
        enum: CargaHorariaDias,
        nullable: true,
    })
    dia: CargaHorariaDias;

    @Column({
        type:'enum',
        enum: TipoCargaHoraria,
    })
    tipo: TipoCargaHoraria;

    @Column()
    horas: number;

}