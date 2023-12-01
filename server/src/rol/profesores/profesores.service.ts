import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Profesor } from './profesor.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { PersonaService } from 'src/persona/persona.service';

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectRepository(Profesor) private repo: Repository<Profesor>,
    private personaService: PersonaService,
  ) {}
  

  async create(dto: CreateProfesorDto) {
    //const persona 
    let profesor = this.repo.create({
      especialidad: dto.especialidad,
      honorarios: dto.honorarios,
      descripcion: dto.descripcion,
      persona: dto.persona
    })

    profesor = await this.repo.save(profesor)

    const personaProfesor = await this.personaService.crearPersona(dto.datosPersonales, profesor)

    return personaProfesor
  }

  async findAll(filters) {
    let cantidad_por_pagina = 10;

    let processed_filter:FindManyOptions<Profesor> = {
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

    return this.repo.find(processed_filter);
  }

  findOne(id: number) {
    return this.repo.findOne({where:{id}, relations:["localidad"]});
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    return 'Falta implementar'
  }

  remove(id: number) {
    return this.repo.softDelete(id)
  }
}
