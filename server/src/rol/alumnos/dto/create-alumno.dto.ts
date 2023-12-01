import { Curso } from "src/curso/entities/curso.entity";
import { Persona } from "src/persona/entities/persona.entity";

export class CreateAlumnoDto {
    persona:Persona
    curso:Curso
    dniResponsable:number
    nombreResponsable:string
    apellidoResponsable:string
    responsable: Enumerator
}