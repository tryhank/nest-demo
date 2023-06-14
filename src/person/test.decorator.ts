import {
  Get,
  SetMetadata,
  applyDecorators,
  UseGuards,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { RoleGuard } from './role.guard';
import { Request } from 'express';

// 封装SetMetadata装饰器
export const RoleMeta = (role: string) => SetMetadata('role', role);

// 合并多个装饰器
export const Combine = (path, role) =>
  applyDecorators(Get(path), RoleMeta(role), UseGuards(RoleGuard));

// 自定义参数装饰器
export const MyQuery = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.query[data];
    }
    return request.query;
  },
);
