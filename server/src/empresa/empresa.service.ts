import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  findAll() {
    return this.repo.find({relations:["localidad"]});  
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
