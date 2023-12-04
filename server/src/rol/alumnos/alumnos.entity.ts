import { ChildEntity, Column, ManyToOne} from "typeorm";
import { Rol } from "../rol.entity";
import { Dictado } from "src/dictado/entities/dictado.entity";
import { Curso } from "src/curso/entities/curso.entity";

@ChildEntity()
export class Alumnos extends Rol {

    @ManyToOne(() => Dictado, (dictado) => dictado.alumnos)
    dictado: Dictado;

    @ManyToOne(() => Curso, (curso) => curso.alumnosEnListaDeEspera)
    curso: Curso;
}