import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GlobalModuleService } from './global-module.service';
import { CreateGlobalModuleDto } from './dto/create-global-module.dto';
import { UpdateGlobalModuleDto } from './dto/update-global-module.dto';

@Controller('global-module')
export class GlobalModuleController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log(signal, 'beforeApplicationShutdown');
  }

  onApplicationShutdown(signal?: string) {
    console.log(
      this.moduleRef.get<GlobalModuleService>(GlobalModuleService).findAll(),
    );
    console.log(signal, 'onApplicationShutdown');
  }

  constructor(
    private readonly globalModuleService: GlobalModuleService,
    private moduleRef: ModuleRef,
  ) {}

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
  update(
    @Param('id') id: string,
    @Body() updateGlobalModuleDto: UpdateGlobalModuleDto,
  ) {
    return this.globalModuleService.update(+id, updateGlobalModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalModuleService.remove(+id);
  }
}
