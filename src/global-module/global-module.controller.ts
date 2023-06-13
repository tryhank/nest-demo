import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GlobalModuleService } from './global-module.service';
import { CreateGlobalModuleDto } from './dto/create-global-module.dto';
import { UpdateGlobalModuleDto } from './dto/update-global-module.dto';

@Controller('global-module')
export class GlobalModuleController {
  constructor(private readonly globalModuleService: GlobalModuleService) {}

  @Post()
  create(@Body() createGlobalModuleDto: CreateGlobalModuleDto) {
    return this.globalModuleService.create(createGlobalModuleDto);
  }

  @Get()
  findAll() {
    return this.globalModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalModuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalModuleDto: UpdateGlobalModuleDto) {
    return this.globalModuleService.update(+id, updateGlobalModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalModuleService.remove(+id);
  }
}
