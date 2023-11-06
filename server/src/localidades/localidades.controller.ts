import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocalidadesService } from './localidades.service';
import { Public } from 'src/auth/auth.guard';

@Controller('localidades')
export class LocalidadesController {
  constructor(private readonly localidadesService: LocalidadesService) {}
  @Public()
  @Get()
  findAll(@Query('like') like_filter, @Query('limit') limit) {
    return this.localidadesService.findAll({like_filter, limit});
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localidadesService.findOne(+id);
  }
}
