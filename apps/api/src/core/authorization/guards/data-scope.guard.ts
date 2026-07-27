import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DATA_SCOPE_KEY } from '../decorators/data-scope.decorator';

@Injectable()
export class DataScopeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const module = this.reflector.getAllAndOverride<string>(DATA_SCOPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!module) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // TODO: Generate prisma where clause via DataScopeService and attach to request.dataScope
    request.dataScope = { /* generated prisma filters */ };

    return true;
  }
}