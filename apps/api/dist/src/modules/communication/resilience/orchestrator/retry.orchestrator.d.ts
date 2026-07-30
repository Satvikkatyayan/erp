import { DeliveryService } from '../../services/delivery.service';
export declare class RetryOrchestrator {
    private readonly deliveryService;
    private readonly logger;
    constructor(deliveryService: DeliveryService);
    executeRetry(correlationId: string, tenantId: string, channel: string, attemptId: string): Promise<void>;
}
//# sourceMappingURL=retry.orchestrator.d.ts.map