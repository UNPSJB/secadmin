import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDictadoDto } from './dto/create-dictado.dto';
import { UpdateDictadoDto } from './dto/update-dictado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictado } from './entities/dictado.entity';
import { FindManyOptions, FindOptions, ILike, Repository, SelectQueryBuilder } from 'typeorm';
import { AulaService } from 'src/aula/aula.service';
import { ProfesoresService } from 'src/rol/profesores/profesores.service';
import { CursoService } from '../curso/curso.service'

@Injectable()
export class DictadoService {
  constructor(
    @InjectRepository(Dictado) private repo: Repository<Dictado>,
    private aulaService: AulaService,
    private profesorService: ProfesoresService,
    private cursoService: CursoService

  ){}
  async create(dto: CreateDictadoDto) {
    const profesorPromise = this.profesorService.findOne(dto.profesor);
    const cursoPromise = this.cursoService.findOne(dto.curso);

    const [profesor, curso] = await Promise.all([profesorPromise, cursoPromise])
    
    if(!profesor) {
      throw new NotFoundException("No se ha encontrado la localidad solicitada")
    }

    if(!curso) {
      throw new NotFoundException("No se ha encontrado la localidad solicitada")
    }

    return this.repo.save({
      curso,
      profesor,
      precio: dto.precio,
      precio_afiliado: dto.precio_afiliado,
      fecha_inicio: dto.fecha_inicio,
      fecha_fin: dto.fecha_fin,
      capacidad: dto.capacidad,
    });
  }
  

  async findAll(filters) {
    const cantidad_por_pagina = 10;
  
    let processed_filter: FindManyOptions<Dictado> = {
      where: {},
      take: cantidad_por_pagina,
      order: { id: 'ASC' as 'ASC' },
      relations: ['profesor.persona']
    };
  
    if (filters.curso_filter) {
      processed_filter.where = { curso: { id: filters.curso_filter }}
    }

    if (filters.like_filter) {
      processed_filter.where = [
        { profesor: { persona: { nombre: ILike(`%${filters.like_filter}%`)}} },
        { profesor: { persona: { apellido: ILike(`%${filters.like_filter}%`)}} },
      ];
    }
  
    if (filters.orden_por_filter) {
      processed_filter.order = { [filters.orden_por_filter]: filters.orden_direccion_filter || 'ASC' };
    }
  
    if (filters.pagina_filter) {
      const pagina = Number(filters.pagina_filter);
      processed_filter = {
        ...processed_filter,
        skip: (pagina - 1) * cantidad_por_pagina
      };
    }
  
    const [dictados, cantidadDeDictados] = await this.repo.findAndCount(processed_filter);
  
    return {
      dictados,
      cantidadDeDictados
    };
  }
  

  findOne(id: number) {
    return this.repo.findOne({where:{ id }, relations: ['profesor.persona', 'alumnos']});
  }

  async update(id: number, updateDictadoDto: UpdateDictadoDto) {
    // const dictado = await this.repo.findOne({where: {id}});
  
    // if (!dictado) {
    //   throw new NotFoundException(`No se ha encontrado el dictado con ID ${id}`);
    // }
    // return this.repo.update({id}, {
    //   codigo_dictado: updateDictadoDto.codigo_dictado,
    //   nombre_dictado: updateDictadoDto.nombre_dictado,
    //   tipo_dictado: updateDictadoDto.tipo_dictado,
    //   categoria_dictado: updateDictadoDto.categoria_dictado,
    // });
  }
  
  
  remove(id: number) {
    return this.repo.softDelete(id)
  }
}