import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LocalidadesService } from './localidades.service';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { UpdateLocalidadeDto } from './dto/update-localidade.dto';

@Controller('localidades')
export class LocalidadesController {
  constructor(private readonly localidadesService: LocalidadesService) {}
  @Get()
  findAll(@Query('like') like_filter) {
    return this.localidadesService.findAll({like_filter});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localidadesService.findOne(+id);
  }
}
