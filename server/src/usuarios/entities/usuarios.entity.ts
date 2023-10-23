import { Persona } from "src/persona/entities/persona.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Persona, (persona) => persona.usuario) // specify inverse side as a second parameter
    @JoinColumn()
    persona: Persona;

    @CreateDateColumn()
    fecha_creacion: Date


    @UpdateDateColumn()
    fecha_actualizacion: Date

    @DeleteDateColumn()
    fecha_eliminado: Date
}