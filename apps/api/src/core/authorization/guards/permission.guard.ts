import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
       throw new ForbiddenException('User not authenticated');
    }

    // TODO: Fetch user permissions from PermissionCacheService
    // const hasPermission = () => requiredPermissions.every(p => user.permissions.includes(p));
    // if (!hasPermission()) throw new ForbiddenException('Insufficient permissions');

    return true; // Temp fallback
  }
}