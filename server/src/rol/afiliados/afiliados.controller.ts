import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { AfiliadosService } from './afiliados.service';
import { CreateAfiliadoDto } from './dto/create-afiliado.dto';
import { UpdateAfiliadoDto } from './dto/update-afiliado.dto';

@Controller('afiliados')
export class AfiliadosController {
    constructor(private readonly afiliadosService: AfiliadosService) {}

    @Post()
    create(@Body() createAulaDto: CreateAfiliadoDto) {
      return this.afiliadosService.create(createAulaDto);
    }

    @Get()
    findAll(
      @Query('like') like_filter:string,
      @Query('ordenPor') orden_por_filter:string,
      @Query('ordenDireccion') orden_direccion_filter:string,
      @Query('pagina') pagina_filter:string,
    ) {
      return this.afiliadosService.findAll({
        like_filter, 
        orden_por_filter,
        orden_direccion_filter,
        pagina_filter
      });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.afiliadosService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAulaDto: UpdateAfiliadoDto) {
      return this.afiliadosService.update(+id, updateAulaDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.afiliadosService.remove(+id);
    }
}
