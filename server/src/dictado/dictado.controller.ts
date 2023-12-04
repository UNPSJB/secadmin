import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DictadoService } from './dictado.service';
import { CreateDictadoDto } from './dto/create-dictado.dto';
import { UpdateDictadoDto } from './dto/update-dictado.dto';

@Controller('dictados')
export class DictadoController {
  constructor(private readonly dictadoService: DictadoService) {}

  @Post()
  create(@Body() createDictadoDto: CreateDictadoDto) {
    return this.dictadoService.create(createDictadoDto);
  }

  @Get()
  findAll(  
    @Query('curso') curso_filter:string,
    @Query('like') like_filter:string,
    @Query('ordenPor') orden_por_filter:string,
    @Query('ordenDireccion') orden_direccion_filter:string,
    @Query('pagina') pagina_filter:string,
  
  ) {
    return this.dictadoService.findAll({
      curso_filter,
      like_filter, 
      orden_por_filter,
      orden_direccion_filter,
      pagina_filter
    });
}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictadoDto: UpdateDictadoDto) {
    return this.dictadoService.update(+id, updateDictadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictadoService.remove(+id);
  }
}