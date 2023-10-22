import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Localidades } from "./entities/localidades.entity"
import { ILike, Repository } from 'typeorm';

@Injectable()
export class LocalidadesService {
  constructor(@InjectRepository(Localidades) private repo: Repository<Localidades>,) {}
  
  findAll(filters) {
    let processed_filter = {}

    if(filters.like_filter) {
      processed_filter = { where: { nombre: ILike(`%${filters.like_filter}%`)}}
    }

    return this.repo.find(processed_filter);
  }

  findOne(id: number) {
    return this.repo.findOne({where:{id}});
  }
}
