import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { GlobalModuleModule } from './global-module/global-module.module';
import { CircularReferModule } from './circular-refer/circular-refer.module';
import { DynamicModuleModule } from './dynamic-module/dynamic-module.module';
import { HelloWorldMiddleware } from './hello-world.middleware';

@Module({
  imports: [
    PersonModule,
    GlobalModuleModule,
    CircularReferModule,
    DynamicModuleModule.register({
      name: 'admin',
      role: 'administrator',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(HelloWorldMiddleware).forRoutes('*');
    consumer
      .apply(HelloWorldMiddleware)
      .forRoutes({ path: 'hello', method: RequestMethod.GET });
  }
}
