import { categoriaCurso, tipoCurso } from "../entities/curso.entity";

export class CreateCursoDto {
    codigo_curso: string;
    nombre_curso: string;
    categoria_curso: categoriaCurso; 
    tipo_curso: tipoCurso;
}
