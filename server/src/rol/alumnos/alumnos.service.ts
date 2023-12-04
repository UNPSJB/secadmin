import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Alumnos } from './alumnos.entity';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { PersonaService } from 'src/persona/persona.service';
import { DictadoService } from 'src/dictado/dictado.service';
import { CursoService } from 'src/curso/curso.service';
import { CrearEnListaDeEsperaDto } from './dto/crear-en-lista-de-espera.dto';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumnos) private repo: Repository<Alumnos>,
    private personaService: PersonaService,
    private dictadoService: DictadoService,
    private cursoService: CursoService,
  ) {}
  

  async create(dto: CreateAlumnoDto) {
    const dictadoPromise = this.dictadoService.findOne(dto.dictado)

    const personaPromise = this.personaService.findOnePorDocumento(dto.datosPersonales.tipoDocumento, dto.datosPersonales.nroDocumento); 
    
    const [dictado,persona] = await Promise.all([dictadoPromise, personaPromise]);

    
    if(dictado.alumnos.length >= dictado.capacidad) {
      throw new NotFoundException("No se puede seguir agregando inscriptos a este curso. La capacidad está al máximo.")
    }

    if(persona) {
      const inscripto = await this.repo.find({
        where:{
          dictado: {id : dictado.id}, 
          persona: {id: persona.id}
        }
      });

      if (inscripto) {
        throw new NotFoundException("La persona ingresada ya está inscripta al dictado.")
      }
    }
    
    let alumno = this.repo.create({
      dictado: dictado
    })

    alumno = await this.repo.save(alumno);

    const personaAlumno = await this.personaService.crearPersona(dto.datosPersonales, alumno)

    return personaAlumno
  }

  async crearEnListaDeEspera(dto: CrearEnListaDeEsperaDto) {
    const cursoPromise = this.cursoService.findOne(dto.curso);

    const personaPromise = this.personaService.findOnePorDocumento(dto.datosPersonales.tipoDocumento, dto.datosPersonales.nroDocumento); 
    
    const [curso,persona] = await Promise.all([cursoPromise, personaPromise]);

    if(persona) {
      const inscripto = await this.repo.find({
        where:{
          curso: {id : curso.id}, 
          persona: {id: persona.id}
        }
      });

      if (inscripto) {
        throw new NotFoundException("La persona ingresada ya está inscripta a la lista de espera.")
      }
    }
    
    let alumno = this.repo.create({
      curso: curso
    })

    alumno = await this.repo.save(alumno);

    const personaAlumno = await this.personaService.crearPersona(dto.datosPersonales, alumno)

    return personaAlumno
  }

  async findAll(filters) {
    let cantidad_por_pagina = 10;

    let processed_filter:FindManyOptions<Alumnos> = {
      where: {},
      relations:["persona"],
      take:cantidad_por_pagina,
      order: {id: 'ASC' as 'ASC'}
    };

    if(filters.dictado_filter) {
      processed_filter.where = {
        dictado: { id: filters.dictado_filter}
      }
    }


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

    const [alumnos, cantidadDeAlumnos] = await this.repo.findAndCount(processed_filter);  

    return {
      alumnos, 
      cantidadDeAlumnos
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
