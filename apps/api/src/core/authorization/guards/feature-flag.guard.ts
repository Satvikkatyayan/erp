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