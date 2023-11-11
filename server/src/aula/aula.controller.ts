import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AulaService } from './aula.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Public } from 'src/auth/auth.guard';

@Controller('aulas')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}
  
  @Public()
  @Post()
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulaService.create(createAulaDto);
  }

  @Get()
  findAll(
    @Query('like') like_filter:string,
    @Query('ordenPor') orden_por_filter:string,
    @Query('ordenDireccion') orden_direccion_filter:string  
  ) {
    return this.aulaService.findAll({
      like_filter, 
      orden_por_filter,
      orden_direccion_filter
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aulaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulaService.update(+id, updateAulaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aulaService.remove(+id);
  }
}
