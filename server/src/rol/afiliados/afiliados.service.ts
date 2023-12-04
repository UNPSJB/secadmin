import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Afiliado, EstadoAfiliacion } from './afiliado.entity';
import { CreateAfiliadoDto } from './dto/create-afiliado.dto';
import { UpdateAfiliadoDto } from './dto/update-afiliado.dto';
import { PersonaService } from 'src/persona/persona.service';
import { Localidades } from 'src/localidades/entities/localidades.entity';
import { LocalidadesService } from 'src/localidades/localidades.service';
import { Nacionalidad } from 'src/persona/entities/nacionalidades.entity';

@Injectable()
export class AfiliadosService {
  constructor(
    @InjectRepository(Afiliado) private repo: Repository<Afiliado>,
    private personaService: PersonaService,
  ) {}
  

  async create(dto: CreateAfiliadoDto) {
    let conyuge = null;
    let hijos = []

    if(dto.datosFamiliares.conyuge) {
      conyuge = await this.personaService.crearPersona(dto.datosFamiliares.conyuge);
    }

    for(let hijo of dto.datosFamiliares.hijos) {
      hijos.push(await this.personaService.crearPersona(hijo));
    }

    
    let afiliado = this.repo.create({
      cargaHorariaTipo: dto.datosLaborales.cargaHoraria.tipo,
      cargaHorariaHoras: dto.datosLaborales.cargaHoraria.horas,
      fechaIngreso: new Date(dto.datosLaborales.fechaIngreso),
      ramaDedicacion: dto.datosLaborales.ocupacion,
      conyuge: conyuge,
      hijos: hijos,
      estado: EstadoAfiliacion.EVALUANDO
    })
    
    afiliado = await this.repo.save(afiliado)

    const personaAfiliado = await this.personaService.crearPersona(dto.datosPersonales, afiliado)

    return personaAfiliado
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

    const [afiliados, cantidadDeAfiliados] = await this.repo.findAndCount(processed_filter);  

    return {
      afiliados, 
      cantidadDeAfiliados
    }
  }

  findOne(id: number) {
    return this.repo.findOne({where:{id}, relations:["localidad"]});
  }

  async update(id: number, updateAfiliadoDto: UpdateAfiliadoDto) {
    return 'Falta implementar'
  }

  remove(id: number) {
    return this.repo.softDelete(id)
  }
}
