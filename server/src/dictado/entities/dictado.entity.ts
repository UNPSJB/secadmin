import { Aula } from "src/aula/entities/aula.entity";
import { Curso } from "src/curso/entities/curso.entity";
import { Profesor } from "src/rol/profesores/profesor.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity('dictados')
export class Dictado {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Curso)
    curso: Curso;

    @ManyToOne(() => Profesor)
    profesor: Profesor;
    
    @Column()
    precio: number;
    
    @Column()
    precio_afiliado: number;
    
    @Column()
    capacidad: number;
    
    @Column()
    fecha_inicio: Date;
    
    @Column()
    fecha_fin: Date;

    @CreateDateColumn()
    fecha_creacion: Date

    @UpdateDateColumn()
    fecha_actualizacion: Date

    @DeleteDateColumn()
    fecha_eliminacion: Date
}
