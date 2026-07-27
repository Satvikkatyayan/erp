import { Injectable } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class OffboardingEventPublisher {
  constructor(private readonly sdk: PlatformSDK) {}
}
