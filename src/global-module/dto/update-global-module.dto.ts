import { PartialType } from '@nestjs/mapped-types';
import { CreateGlobalModuleDto } from './create-global-module.dto';

export class UpdateGlobalModuleDto extends PartialType(CreateGlobalModuleDto) {}
