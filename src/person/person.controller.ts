import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { GlobalModuleService } from '../global-module/global-module.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { RoleMeta, Combine, MyQuery } from './test.decorator';
import { RoleGuard } from './role.guard';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    @Inject('person2') private readonly person2, // @Inject('person3') private readonly person3, // @Inject('person4') private readonly person4,
    private readonly globalService: GlobalModuleService,
  ) {}

  // formdata 传参 Content-Type: multipart/form-data
  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  upload(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  // json 传参 Content-Type: application/json,  form urlencoded 传参 Content-Type: application/x-www-form-urlencoded
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  // query 传参
  @Get()
  findAll(@Query('name') name: string, @Query('age') age: number) {
    return this.globalService.findOne(1);
  }

  // url param 传参
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   console.log(this.person2);
  //   return this.personService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }

  // 自定义装饰器
  @Get('role')
  @RoleMeta('anna')
  @UseGuards(RoleGuard)
  getRole(@Query('role') role: string) {
    return role;
  }

  @Combine('role2', 'anna1')
  getRole2(@Query('role') role: string) {
    return role;
  }

  @Get('helloworld')
  getHelloworld(@MyQuery() name: any) {
    return name;
  }
}
