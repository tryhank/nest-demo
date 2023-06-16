import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`after...${Date.now() - now}ms`)));
  }
}
/**
 *  路由级别的拦截器 使用 UseInterceptors 装饰器注入, 可以进行依赖注入。
 *  全局级别拦截器有两种方式注入
 *  1. 使用 app.useGlobalInterceptors(new Interceptor) 注入, 不可以进行依赖注入。
 *  2. 在 AppModule 里面使用 APP_INTERCEPTOR 通过 providers 注入。
 *  providers: [
 *    {
 *      provide: APP_INTERCEPTOR,
 *      useClass: Interceptor
 *    }
 *  ]
 * */
