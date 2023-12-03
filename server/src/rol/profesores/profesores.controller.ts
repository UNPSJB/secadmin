import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesores')
export class ProfesoresController {
    constructor(private readonly ProfesoresService: ProfesoresService) {}

    @Post()
    create(@Body() createProfesorDto: CreateProfesorDto) {
      return this.ProfesoresService.create(createProfesorDto);
    }

    @Get()
    findAll(
      @Query('like') like_filter:string,
      @Query('ordenPor') orden_por_filter:string,
      @Query('ordenDireccion') orden_direccion_filter:string,
      @Query('pagina') pagina_filter:string,
    ) {
      return this.ProfesoresService.findAll({
        like_filter, 
        orden_por_filter,
        orden_direccion_filter,
        pagina_filter
      });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.ProfesoresService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProfesorDto: UpdateProfesorDto) {
      return this.ProfesoresService.update(+id, updateProfesorDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.ProfesoresService.remove(+id);
    }
}
