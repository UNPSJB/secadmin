import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Alumnos } from './alumnos.entity';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { PersonaService } from 'src/persona/persona.service';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumnos) private repo: Repository<Alumnos>,
    private personaService: AlumnosService,
  ) {}
  

  async create(dto: CreateAlumnoDto) {
    //const persona 
    let alumno = this.repo.create({
    
      persona: dto.persona
    })

    alumno = await this.repo.save(alumno)

   // const personaAlumno = await this.personaService.crearPersona(dto.datosPersonales, alumno)

    //return personaAlumno
  }

  async findAll(filters) {
    let cantidad_por_pagina = 10;

    let processed_filter:FindManyOptions<Alumnos> = {
      where: {},
      relations:["persona"],
      take:cantidad_por_pagina,
      order: {id: 'ASC' as 'ASC'}
    };


    if(filters.like_filter) {
      // processed_filter.where = [
      //   { persona: { dni: ILike(`%${filters.like_filter}%`) } },
      //   { persona: { nombre: ILike(`%${filters.like_filter}%`) } },
      //   { persona: { apellido: ILike(`%${filters.like_filter}%`) } },
      //   { direccion: ILike(`%${filters.like_filter}%`) },
      // ]
    }

    if(filters.orden_por_filter) {
      if (filters.orden_por_filter === 'localidad') {
        processed_filter.order = { "persona": { "localidad": {"nombre": filters.orden_direccion_filter || "ASC"} }}
      } else {
        processed_filter.order = { [filters.orden_por_filter]: filters.orden_direccion_filter || "ASC" }
      }
    }

    if(filters.pagina_filter) {
      const pagina = Number(filters.pagina_filter)
      processed_filter = {
        ...processed_filter,
        take: cantidad_por_pagina,
        skip: (pagina - 1) * cantidad_por_pagina 
      }
    }

    
  }

  findOne(id: number) {
    return this.repo.findOne({where:{id}, relations:["localidad"]});
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    return 'Falta implementar'
  }

  remove(id: number) {
    return this.repo.softDelete(id)
  }
}
