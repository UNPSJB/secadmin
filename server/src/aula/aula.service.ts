import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Aula } from './entities/aula.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    const aula = this.repo.create({
      capacidad: dto.capacidad,
      codigo_aula: dto.codigo_aula,
      direccion: dto.direccion,
      localidad: localidad
    })

    return this.repo.save(aula)
  }

  findAll() {
    return this.repo.find();  
  }

  findOne(id: number) {
    return this.repo.findOne({where:{id}});
  }

  update(id: number, updateAulaDto: UpdateAulaDto) {
    return `This action updates a #${id} aula`;
  }

  remove(id: number) {
    return this.repo.softDelete(id)
  }
}
