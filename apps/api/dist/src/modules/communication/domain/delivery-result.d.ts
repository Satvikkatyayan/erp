import { DeliveryLifecycle } from './delivery-lifecycle.enum';
export declare class DeliveryResult {
    readonly isSuccess: boolean;
    readonly finalStage: DeliveryLifecycle;
    readonly correlationId: string;
    readonly error?: {
        code: string;
        message: string;
    };
    constructor(isSuccess: boolean, finalStage: DeliveryLifecycle, correlationId: string, error?: {
        code: string;
        message: string;
    });
}
//# sourceMappingURL=delivery-result.d.ts.map