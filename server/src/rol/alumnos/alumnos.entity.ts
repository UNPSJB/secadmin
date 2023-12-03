import { ChildEntity, Column} from "typeorm";
import { Rol } from "../rol.entity";

@ChildEntity()
export class Alumnos extends Rol {}