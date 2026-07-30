import { PayPayslipRepository } from '../repositories/payslip.repository';
import { PayslipAssembler } from './payslip-assembler.service';
import { EventBusService } from '../../../core/events/event-bus.service';
export declare class PayslipService {
    private readonly payslipRepo;
    private readonly assembler;
    private readonly eventBus;
    private readonly logger;
    constructor(payslipRepo: PayPayslipRepository, assembler: PayslipAssembler, eventBus: EventBusService);
    generatePayslip(ctx: any, runId: string, employeeId: string, calculationId: string, snapshotId: string, tx: any): Promise<string>;
}
//# sourceMappingURL=payslip.service.d.ts.map