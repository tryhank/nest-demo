import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface DynamicModuleOptions {
  name: string;
  role: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DynamicModuleOptions>().build();
