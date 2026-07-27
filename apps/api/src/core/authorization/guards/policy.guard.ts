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