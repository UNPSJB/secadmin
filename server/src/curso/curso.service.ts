import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { ILike, Repository } from 'typeorm';


@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso) private repo: Repository<Curso>
  ){}
  async create(dto: CreateCursoDto) {
    const existeCurso = await this.repo.findOne({
      where: { nombre_curso: dto.nombre_curso }
    });
    
    const curso = this.repo.create({
      codigo_curso: dto.codigo_curso,
      nombre_curso: dto.nombre_curso,
      tipo_curso: dto.tipo_curso,
      categoria_curso: dto.categoria_curso
    });
  
    return this.repo.save(curso);
  }
  

  async findAll(filters) {
    const cantidad_por_pagina = 10;
  
    let processed_filter: any = {
      where: {},
      take: cantidad_por_pagina,
      order: { id: 'ASC' as 'ASC' }
    };
  
    if (filters.like_filter) {
      processed_filter.where = [
        { codigo_curso: ILike(`%${filters.like_filter}%`) },
        { nombre_curso: ILike(`%${filters.like_filter}%`) },
        { tipo_curso: ILike(`%${filters.like_filter}%`) },
        { categoria_curso: ILike(`%${filters.like_filter}%`) },
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
  
    const [cursos, cantidadDeCursos] = await this.repo.findAndCount(processed_filter);
  
    return {
      cursos,
      cantidadDeCursos
    };
  }
  

  findOne(id: number) {
    return this.repo.findOne({where:{ id }});
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    const curso = await this.repo.findOne({where: {id}});
  
    if (!curso) {
      throw new NotFoundException(`No se ha encontrado el curso con ID ${id}`);
    }
    return this.repo.update({id}, {
      codigo_curso: updateCursoDto.codigo_curso,
      nombre_curso: updateCursoDto.nombre_curso,
      tipo_curso: updateCursoDto.tipo_curso,
      categoria_curso: updateCursoDto.categoria_curso,
    });
  }
  
  
  remove(id: number) {
    return this.repo.softDelete(id)
  }
}