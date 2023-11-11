import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  findAll(
    @Query('like') like_filter:string,
    @Query('ordenPor') orden_por_filter:string,
    @Query('ordenDireccion') orden_direccion_filter:string,
    @Query('pagina') pagina_filter:string,
  ) {
    return this.empresaService.findAll({
      like_filter, 
      orden_por_filter,
      orden_direccion_filter,
      pagina_filter
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(+id, updateEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(+id);
  }
}
