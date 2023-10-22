import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocalidadesService } from './localidades.service';

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
