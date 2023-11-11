import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { LocalidadesService } from 'src/localidades/localidades.service';


@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa) private repo: Repository<Empresa>,
      private localidadService: LocalidadesService  
    ) {}
  
  async create(dto: CreateEmpresaDto) {
    const localidad = await this.localidadService.findOne(dto.localidad);
  
      if(!localidad) {
        throw new NotFoundException("No se ha encontrado la localidad solicitada")
      }
  
    const empresa = this.repo.create({
      cuit: dto.cuit,
      razon_social: dto.razon_social,
      direccion: dto.direccion,
      localidad: localidad
    })
  
    return this.repo.save(empresa)
  }

  async findAll(filters) {
    let cantidad_por_pagina = 10;


    let processed_filter:any = {
      where: {},
      relations:["localidad"],
      take:cantidad_por_pagina,
      order: {id: 'ASC' as 'ASC'}
    };

    if(filters.like_filter) {
      processed_filter.where = [
        { cuit: ILike(`%${filters.like_filter}%`) },
        { localidad: { nombre: ILike(`%${filters.like_filter}%`) } },
        { direccion: ILike(`%${filters.like_filter}%`) },
        { razon_social: ILike(`%${filters.like_filter}%`) },
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

    const [empresas, cantidadDeEmpresas] = await this.repo.findAndCount(processed_filter);  

    return {
      empresas, 
      cantidadDeEmpresas
    };
  }

  findOne(id: number) {
    return this.repo.findOne({where:{id}, relations:["localidad"]});
  }


  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    const localidad = await this.localidadService.findOne(updateEmpresaDto.localidad);

    if(!localidad) {
      throw new NotFoundException("No se ha encontrado la localidad solicitada")
    }

    return this.repo.update({id}, {
      cuit: updateEmpresaDto.cuit,
      razon_social: updateEmpresaDto.razon_social,
      direccion: updateEmpresaDto.direccion,
      localidad
    });
  }


  remove(id: number) {
    return this.repo.softDelete(id)
  }
}
