import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Controller('alumnos')
export class AlumnosController {
    constructor(private readonly AlumnosService: AlumnosService) {}

    @Post()
    create(@Body() createAlumnosDto: CreateAlumnoDto) {
      return this.AlumnosService.create(createAlumnosDto);
    }

    @Post("listaespera")
    createListaEspera(@Body() createAlumnosDto: CreateAlumnoDto) {
      return this.AlumnosService.crearEnListaDeEspera(createAlumnosDto);
    }

    @Get()
    findAll(
      @Query('curso') curso_filter:string,
      @Query('dictado') dictado_filter:string,
      @Query('like') like_filter:string,
      @Query('ordenPor') orden_por_filter:string,
      @Query('ordenDireccion') orden_direccion_filter:string,
      @Query('pagina') pagina_filter:string,
    ) {
      return this.AlumnosService.findAll({
        curso_filter,
        dictado_filter,
        like_filter, 
        orden_por_filter,
        orden_direccion_filter,
        pagina_filter
      });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.AlumnosService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
      return this.AlumnosService.update(+id, updateAlumnoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.AlumnosService.remove(+id);
    }
}
