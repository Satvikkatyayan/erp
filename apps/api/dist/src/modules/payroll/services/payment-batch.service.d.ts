import { PayPaymentBatchRepository } from '../repositories/payment-batch.repository';
import { EventBusService } from '../../../core/events/event-bus.service';
export declare class PaymentBatchService {
    private readonly batchRepo;
    private readonly eventBus;
    private readonly logger;
    constructor(batchRepo: PayPaymentBatchRepository, eventBus: EventBusService);
    generatePaymentBatch(ctx: any, payrollRunId: string, calculations: any[], tx?: any): Promise<string>;
}
//# sourceMappingURL=payment-batch.service.d.ts.map