import { ChildEntity, Column} from "typeorm";
import { Rol } from "../rol.entity";

@ChildEntity()
export class Profesores extends Rol {
  @Column()
  especialidad: string
  @Column()
  honorarios:number
  @Column()
  descripcion: string
}