import { Injectable } from '@nestjs/common';
import { CreateGlobalModuleDto } from './dto/create-global-module.dto';
import { UpdateGlobalModuleDto } from './dto/update-global-module.dto';

@Injectable()
export class GlobalModuleService {
  create(createGlobalModuleDto: CreateGlobalModuleDto) {
    return 'This action adds a new globalModule';
  }

  findAll() {
    return `This action returns all globalModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} globalModule`;
  }

  update(id: number, updateGlobalModuleDto: UpdateGlobalModuleDto) {
    return `This action updates a #${id} globalModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} globalModule`;
  }
}
