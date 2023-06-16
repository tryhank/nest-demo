// import { Module, DynamicModule } from '@nestjs/common';
// import { DynamicModuleService } from './dynamic-module.service';
// import { DynamicModuleController } from './dynamic-module.controller';

// /* 手动注册 */
// @Module({})
// export class DynamicModuleModule {
//   static register(options: Record<string, any>): DynamicModule {
//     return {
//       module: DynamicModuleModule,
//       controllers: [DynamicModuleController],
//       providers: [
//         DynamicModuleService,
//         {
//           provide: 'CONFIG_OPTIONS',
//           useValue: options,
//         },
//       ],
//       exports: [],
//     };
//   }

//   static forRoot(options: Record<string, any>): DynamicModule {
//     return {
//       module: DynamicModuleModule,
//       controllers: [DynamicModuleController],
//       providers: [
//         DynamicModuleService,
//         {
//           provide: 'CONFIG_OPTIONS',
//           useValue: options,
//         },
//       ],
//       exports: [],
//     };
//   }

//   static forFeature(options: Record<string, any>): DynamicModule {
//     return {
//       module: DynamicModuleModule,
//       controllers: [DynamicModuleController],
//       providers: [
//         DynamicModuleService,
//         {
//           provide: 'CONFIG_OPTIONS',
//           useValue: options,
//         },
//       ],
//       exports: [],
//     };
//   }
// }

/* 自动注册 */
import { Module } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';
import { DynamicModuleController } from './dynamic-module.controller';
import { ConfigurableModuleClass } from './dynamic-define';

@Module({
  controllers: [DynamicModuleController],
  providers: [DynamicModuleService],
})
export class DynamicModuleModule extends ConfigurableModuleClass {}
