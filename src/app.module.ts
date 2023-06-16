import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { GlobalModuleModule } from './global-module/global-module.module';
import { CircularReferModule } from './circular-refer/circular-refer.module';
import { DynamicModuleModule } from './dynamic-module/dynamic-module.module';

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
export class AppModule {}
