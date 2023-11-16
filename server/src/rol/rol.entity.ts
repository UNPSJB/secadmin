import { Persona } from "src/persona/entities/persona.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";

@Entity('rol')
@TableInheritance({ column: { type: "varchar", name: "tipo" } })
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Persona, (persona) => persona.roles)
    @JoinColumn()
    persona: Persona;

    @CreateDateColumn()
    fecha_creacion: Date

    @UpdateDateColumn()
    fecha_actualizacion: Date

    @DeleteDateColumn()
    fecha_eliminado: Date
}