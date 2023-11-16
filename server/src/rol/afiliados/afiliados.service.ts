import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Afiliado } from './afiliado.entity';
import { CreateAfiliadoDto } from './dto/create-afiliado.dto';

@Injectable()
export class AfiliadosService {
  constructor(@InjectRepository(Afiliado) private repo: Repository<Afiliado>,) {}
  

  async create(dto: CreateAfiliadoDto) {
    return 'Falta implementar'
  }

  async findAll(filters) {
    let cantidad_por_pagina = 10;

    let processed_filter:FindManyOptions<Afiliado> = {
      where: {},
      relations:["persona"],
      take:cantidad_por_pagina,
      order: {id: 'ASC' as 'ASC'}
    };

    if(filters.like_filter) {
      processed_filter.where = [
        { persona: { dni: ILike(`%${filters.like_filter}%`) } },
        { persona: { nombre: ILike(`%${filters.like_filter}%`) } },
        { persona: { apellido: ILike(`%${filters.like_filter}%`) } },
        { direccion: ILike(`%${filters.like_filter}%`) },
      ]
    }

    if(filters.orden_por_filter) {
      if (filters.orden_por_filter === 'localidad') {
        processed_filter.order = { "localidad": {"nombre": filters.orden_direccion_filter || "ASC"} }
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

    const [aulas, cantidadDeAulas] = await this.repo.findAndCount(processed_filter);  

    return {
      aulas, 
      cantidadDeAulas
    }
  }

  findOne(id: number) {
    return this.repo.findOne({where:{id}, relations:["localidad"]});
  }

  async update(id: number, updateAfiliadoDto: CreateAfiliadoDto) {
    return 'Falta implementar'
  }

  remove(id: number) {
    return this.repo.softDelete(id)
  }
}
