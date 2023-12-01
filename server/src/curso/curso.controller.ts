import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  findAll(  
    @Query('like') like_filter:string,
    @Query('ordenPor') orden_por_filter:string,
    @Query('ordenDireccion') orden_direccion_filter:string,
    @Query('pagina') pagina_filter:string,
  
  ) {
    return this.cursoService.findAll({
      like_filter, 
      orden_por_filter,
      orden_direccion_filter,
      pagina_filter
    });
}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(+id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }
}