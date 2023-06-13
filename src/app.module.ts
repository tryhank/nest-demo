import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { GlobalModuleModule } from './global-module/global-module.module';

@Module({
  imports: [PersonModule, GlobalModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
