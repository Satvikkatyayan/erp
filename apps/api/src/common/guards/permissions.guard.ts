import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<{ action: string; resource: string }[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role || !user.role.permissions) {
      return false;
    }
    
    const userPermissions = user.role.permissions.map((rp: any) => ({
      action: rp.permission.action,
      resource: rp.permission.resource,
    }));

    return requiredPermissions.every((rp) =>
      userPermissions.some((up: any) => up.action === rp.action && up.resource === rp.resource),
    );
  }
}
