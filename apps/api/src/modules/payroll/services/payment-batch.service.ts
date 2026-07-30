import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PayPaymentBatchRepository } from '../repositories/payment-batch.repository';
import { v4 as uuidv4 } from 'uuid';
import { EventBusService } from '../../../core/events/event-bus.service';
import { PaymentBatchCreatedEvent } from '../domain/events/payroll.events';

@Injectable()
export class PaymentBatchService {
  private readonly logger = new Logger(PaymentBatchService.name);

  constructor(
    private readonly batchRepo: PayPaymentBatchRepository,
    private readonly eventBus: EventBusService
  ) {}

  async generatePaymentBatch(ctx: any, payrollRunId: string, calculations: any[], tx?: any): Promise<string> {
    this.logger.log(`Generating payment batch for run ${payrollRunId}`);
    
    // Using transaction scope
    const batch = await this.batchRepo.createBatch(ctx.tenantId, payrollRunId, 1, tx);

    const instructions = calculations.map(calc => ({
      id: uuidv4(),
      batchId: batch.id,
      employeeId: calc.employeeId,
      netPay: calc.netPay,
      currency: calc.currencyId || 'INR',
      bankAccountReference: `ACCT-${calc.employeeId}`, // In a real system, fetched from Employee profile
      paymentMethod: 'BANK_TRANSFER', // Default
      paymentStatus: 'Pending',
      referenceNumber: null
    }));

    await this.batchRepo.createInstructions(instructions, tx);

    this.eventBus.publish(new PaymentBatchCreatedEvent(batch.id, payrollRunId, ctx.tenantId));

    return batch.id;
  }
}
