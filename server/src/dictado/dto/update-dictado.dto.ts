import { PartialType } from '@nestjs/mapped-types';
import { CreateDictadoDto } from './create-dictado.dto';

export class UpdateDictadoDto extends PartialType(CreateDictadoDto) {}
