import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import { Nacionalidad } from "./nacionalidades.entity";
import { EstadoCivil } from "./estados-civiles.enum";
import { Localidades } from "src/localidades/entities/localidades.entity";
import { Rol } from "../../rol/rol.entity";
import { Usuario } from "src/usuarios/entities/usuarios.entity";

@Entity('personas')
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    nroDocumento: string;

    @Column()
    tipoDocumento: string;


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

    @OneToOne(() => Usuario, (usuario) => usuario.persona)
    usuario: Usuario;    

    @OneToMany(() => Rol, (rol:Rol) => rol.persona)
    roles: Rol[]

    @CreateDateColumn()
    fecha_creacion: Date

    @UpdateDateColumn()
    fecha_actualizacion: Date

    @DeleteDateColumn()
    fecha_eliminado: Date
}