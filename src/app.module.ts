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
import { LoggerModuleModule } from './logger-module/logger-module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { createClient } from 'redis';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // PersonModule,
    // GlobalModuleModule,
    // CircularReferModule,
    // DynamicModuleModule.register({
    //   name: 'admin',
    //   role: 'administrator',
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql01',
      database: 'typeorm_test',
      synchronize: true,
      logging: true,
      entities: [User],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'ubmLUPRfhNlg5X9XCRA9r4X48n6TZPFPFDmhQWMWogo=',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    LoggerModuleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient();
        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(HelloWorldMiddleware).forRoutes('*');
    // consumer
    //   .apply(HelloWorldMiddleware)
    //   .forRoutes({ path: 'hello', method: RequestMethod.GET });
  }
}
