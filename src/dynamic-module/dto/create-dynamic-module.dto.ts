import { IsInt, IsString } from 'class-validator';

export class CreateDynamicModuleDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
}
