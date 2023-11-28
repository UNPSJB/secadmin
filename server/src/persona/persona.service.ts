import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Nacionalidad } from './entities/nacionalidades.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona) private repo: Repository<Persona>,
    @InjectRepository(Nacionalidad) private nacionalidadRepository: Repository<Nacionalidad>,
    
  ) { }

  create(createPersonaDto: CreatePersonaDto) {
    return 'This action adds a new persona';
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } })
  }

  findOnePorDocumento(tipo, numero) {
    return this.repo.findOne(
      { 
        where: { 
          tipoDocumento: tipo,
          nroDocumento: numero 
        },
        relations: ['usuario'] 
      }
    );
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return `This action updates a #${id} persona`;
  }

  remove(id: number) {
    return `This action removes a #${id} persona`;
  }

  findAllNacionalidades(filters) {
    let processed_filter:FindManyOptions<Nacionalidad> = {};

    if(filters.like_filter) {
      processed_filter = { where: { nombre_es: ILike(`%${filters.like_filter}%`)}}
    }

    if (filters.limit) {
      processed_filter.take = filters.limit;
    }

    return this.nacionalidadRepository.find(processed_filter);
  }
}
