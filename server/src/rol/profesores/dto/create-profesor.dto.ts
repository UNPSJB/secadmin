import { Persona } from "src/persona/entities/persona.entity";

export class CreateProfesorDto {
    especialidad:string;
    descripcion: string;
    honorarios: number;
    persona: Persona;
    datosPersonales: any;
}