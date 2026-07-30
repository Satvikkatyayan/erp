import { Injectable } from '@nestjs/common';
import { FailureClassifierInterface } from '../contracts/failure-classifier.interface';

@Injectable()
export class FailureClassifierService implements FailureClassifierInterface {
  private readonly transientErrors = new Set([
    'PROVIDER_INVOCATION_ERROR',
    'NETWORK_TIMEOUT',
    'RATE_LIMIT_EXCEEDED'
  ]);

  isTransient(errorCode: string): boolean {
    return this.transientErrors.has(errorCode);
  }
}
