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
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    @Inject('person2') private readonly person2,
    @Inject('person3') private readonly person3,
    @Inject('person4') private readonly person4,
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
    console.log(this.person4, '111');
    return `name: ${name},age: ${age}`;
  }

  // url param 传参
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(this.person2);
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
