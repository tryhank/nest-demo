import {
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TimeInterceptor } from './time.interceptor';
import { DoublePipe } from './double.pipe';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './storage';

enum Test {
  aaa,
  bbb,
  ccc,
}

@Controller()
@UseInterceptors(TimeInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(TimeInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  sayHello(): string {
    return 'hello';
  }

  @Get('test1')
  test1(
    @Query(
      'names',
      new ParseArrayPipe({
        separator: '.',
        items: Number,
        optional: true,
      }),
    )
    names: Array<number>,
  ) {
    return names && names.reduce((total, cur) => total + cur, 0);
  }

  @Get('test2')
  test2(@Query('query', ParseBoolPipe) query) {
    return typeof query;
  }

  @Get('test3')
  test3(@Query('query', new ParseEnumPipe(Test)) query) {
    return query;
  }

  @Get('test4')
  test4(@Query('query', ParseFloatPipe) query) {
    return query + 1;
  }

  @Get('test5')
  test5(@Query('query', ParseIntPipe) query) {
    return query + 1;
  }

  @Get('test6')
  test6(@Query('query', new DefaultValuePipe('default value')) query) {
    return query;
  }

  @Get('test7')
  test7(@Query('query', DoublePipe) query: number) {
    return query;
  }

  @Post('aaa')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('body', body);
    console.log('file', file);
  }

  @Post('bbb')
  @UseInterceptors(
    FilesInterceptor('bbb', 3, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  @Post('ccc')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'aaa', maxCount: 2 },
        { name: 'bbb', maxCount: 3 },
      ],
      {
        dest: 'uploads',
      },
    ),
  )
  uploadFileFields(
    @UploadedFiles()
    files: { aaa?: Express.Multer.File[]; bbb?: Express.Multer.File[] },
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  @Post('ddd')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage,
    }),
  )
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }
}
