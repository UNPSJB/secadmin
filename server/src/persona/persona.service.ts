import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { DeepPartial, FindManyOptions, ILike, Repository } from 'typeorm';
import { Nacionalidad } from './entities/nacionalidades.entity';
import { LocalidadesService } from 'src/localidades/localidades.service';
import { Rol } from 'src/rol/rol.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona) private repo: Repository<Persona>,
    @InjectRepository(Nacionalidad) private nacionalidadRepository: Repository<Nacionalidad>,
    private localidadesService: LocalidadesService,
    
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
        relations: ['usuario','roles'] 
      }
    );
  }

  async crearPersona(personaACrear: DeepPartial<Persona>, rol?: Rol) {
    let persona = await this.findOnePorDocumento(personaACrear.tipoDocumento, personaACrear.nroDocumento);

    if(!persona){
        persona = new Persona();
    } 

    persona.nombre = personaACrear.nombre
    persona.apellido = personaACrear.apellido
    persona.direccion = personaACrear.direccion
    persona.estado_civil = personaACrear.estado_civil
    persona.nroDocumento = personaACrear.nroDocumento
    persona.tipoDocumento = personaACrear.tipoDocumento
    persona.telefono = personaACrear.telefono;

    if(personaACrear.fecha_nacimiento){
      persona.fecha_nacimiento = new Date(personaACrear.fecha_nacimiento as string)
    }

    if(personaACrear.localidad) {
      const localidad = await this.localidadesService.findOne(personaACrear.localidad as number);
      persona.localidad = localidad;
    }

    if(personaACrear.nacionalidad) {
      const nacionalidad = await this.nacionalidadRepository.findOne({where:{id:personaACrear.nacionalidad as number}});
      persona.nacionalidad = nacionalidad;
    }

    if(rol ) {
      if(persona.roles){
        persona.roles = [...persona.roles, rol]
      }else{
        persona.roles= [rol]
      }
    }
    return this.repo.save(persona);
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

  findOneNacionalidad(id) {
    return this.nacionalidadRepository.findOne({where:{id}})
  }
}
