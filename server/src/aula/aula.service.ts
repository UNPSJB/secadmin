import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Aula } from './entities/aula.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { LocalidadesService } from 'src/localidades/localidades.service';

@Injectable()
export class AulaService {
  constructor(
    @InjectRepository(Aula) private repo: Repository<Aula>,
    private localidadService: LocalidadesService  
  ) {}

  async create(dto: CreateAulaDto) {
    const localidad = await this.localidadService.findOne(dto.localidad);

    if(!localidad) {
      throw new NotFoundException("No se ha encontrado la localidad solicitada")
    }

    if(dto.capacidad < 1) {
      throw new BadRequestException("La capacidad no puede ser menor a 1")
    }

    const aula = this.repo.create({
      capacidad: dto.capacidad,
      codigo_aula: dto.codigo_aula,
      direccion: dto.direccion,
      localidad: localidad
    })

    return this.repo.save(aula)
  }

  findAll(filters) {
    let processed_filter = {
      where: {},
      relations:["localidad"],
      take:10,
    };

    if(filters.like_filter) {
      processed_filter.where = [
        { codigo_aula: ILike(`%${filters.like_filter}%`) },
        { localidad: { nombre: ILike(`%${filters.like_filter}%`) } },
        { direccion: ILike(`%${filters.like_filter}%`) },
      ]
    }

    return this.repo.find(processed_filter);  
  }

  findOne(id: number) {
    return this.repo.findOne({where:{id}, relations:["localidad"]});
  }

  async update(id: number, updateAulaDto: UpdateAulaDto) {
    const localidad = await this.localidadService.findOne(updateAulaDto.localidad);

    if(!localidad) {
      throw new NotFoundException("No se ha encontrado la localidad solicitada")
    }

    return this.repo.update({id}, {
      capacidad: updateAulaDto.capacidad,
      codigo_aula: updateAulaDto.codigo_aula,
      direccion: updateAulaDto.direccion,
    });
  }

  remove(id: number) {
    return this.repo.softDelete(id)
  }
}
