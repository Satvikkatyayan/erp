import { DeliveryLifecycle } from './delivery-lifecycle.enum';

export class DeliveryResult {
  public readonly isSuccess: boolean;
  public readonly finalStage: DeliveryLifecycle;
  public readonly correlationId: string;
  public readonly error?: {
    code: string;
    message: string;
  };

  constructor(
    isSuccess: boolean,
    finalStage: DeliveryLifecycle,
    correlationId: string,
    error?: { code: string; message: string }
  ) {
    this.isSuccess = isSuccess;
    this.finalStage = finalStage;
    this.correlationId = correlationId;
    if (error) {
      this.error = { ...error };
    }
    Object.freeze(this);
    if (this.error) Object.freeze(this.error);
  }
}
