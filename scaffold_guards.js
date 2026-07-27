const fs = require('fs');
const path = require('path');

const CORE_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core';

const dirs = [
    'authorization/decorators',
    'authorization/guards',
    'policy/services',
    'scope/services',
    'approval/services',
    'events/services',
    'audit/providers'
];

dirs.forEach(dir => {
    fs.mkdirSync(path.join(CORE_DIR, dir), { recursive: true });
});

// Create Decorators
const decorators = {
    'require-permissions.decorator.ts': `
import { SetMetadata } from '@nestjs/common';
export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);
`,
    'require-features.decorator.ts': `
import { SetMetadata } from '@nestjs/common';
export const FEATURES_KEY = 'features';
export const RequireFeatures = (...features: string[]) => SetMetadata(FEATURES_KEY, features);
`,
    'require-policies.decorator.ts': `
import { SetMetadata } from '@nestjs/common';
export const POLICIES_KEY = 'policies';
export const RequirePolicies = (...policies: string[]) => SetMetadata(POLICIES_KEY, policies);
`,
    'data-scope.decorator.ts': `
import { SetMetadata } from '@nestjs/common';
export const DATA_SCOPE_KEY = 'dataScope';
export const RequireDataScope = (module: string) => SetMetadata(DATA_SCOPE_KEY, module);
`
};

for (const [file, content] of Object.entries(decorators)) {
    fs.writeFileSync(path.join(CORE_DIR, 'authorization/decorators', file), content.trim());
}

// Create Guards
const guards = {
    'permission.guard.ts': `
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
`,
    'feature-flag.guard.ts': `
import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FEATURES_KEY } from '../decorators/require-features.decorator';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFeatures = this.reflector.getAllAndOverride<string[]>(FEATURES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredFeatures) {
      return true;
    }

    // TODO: Evaluate feature flags from Cache
    // if (feature is disabled) throw new NotFoundException('Feature disabled');

    return true;
  }
}
`,
    'policy.guard.ts': `
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { POLICIES_KEY } from '../decorators/require-policies.decorator';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPolicies = this.reflector.getAllAndOverride<string[]>(POLICIES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPolicies) {
      return true;
    }

    // TODO: Evaluate policy against PolicyEngineService
    return true;
  }
}
`,
    'data-scope.guard.ts': `
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
`
};

for (const [file, content] of Object.entries(guards)) {
    fs.writeFileSync(path.join(CORE_DIR, 'authorization/guards', file), content.trim());
}

console.log('Guards and decorators scaffolded.');
