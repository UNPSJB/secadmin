import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

export enum categoriaCurso{
    CAPACITACION = 'Capacitacion',
    GIMNASIOSALUDABLE = 'Gimnasio Saludable',
    CULTURA = 'Cultura'
}

export enum tipoCurso{
    UNICO ='Curso unico',
    PERIODO = 'Curso por periodo', 
    NORMAL = 'Curso normal'
}

@Entity('cursos')
export class Curso {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique:true
    })
    codigo_curso:string

    @Column()
    nombre_curso:string

    @Column({
        type: 'enum',
        enum:tipoCurso
    })
    tipo_curso:tipoCurso

    @Column({
        type: 'enum',
        enum:categoriaCurso
    })
    categoria_curso:categoriaCurso

    @CreateDateColumn()
    fecha_creacion: Date

    @UpdateDateColumn()
    fecha_actualizacion: Date

    @DeleteDateColumn()
    fecha_eliminacion: Date
}
