import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TimeInterceptor } from './time.interceptor';
import { DoublePipe } from './double.pipe';

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
}
