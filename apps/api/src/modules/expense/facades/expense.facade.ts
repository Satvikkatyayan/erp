import { Injectable } from '@nestjs/common';
import { ExpenseOperationEngine } from '../engines/expense-operation.engine';

import { ExpenseEventBus } from '../events/expense-event.bus';

@Injectable()
export class ExpenseFacade {
  constructor(
    private readonly operationEngine: ExpenseOperationEngine,
    private readonly eventBus: ExpenseEventBus,
  ) {}

  async executeCommand(commandName: string, payload: any): Promise<any> {
    const result = await this.operationEngine.executeOperation(commandName, payload);
    
    // Publish domain event after successful state transition
    await this.eventBus.publish({
      eventId: `evt-${Date.now()}`,
      eventType: `${commandName}_COMPLETED`,
      aggregateId: payload.id || payload.claimId || 'unknown',
      aggregateType: 'Expense',
      tenantId: payload.tenantId || 'unknown',
      organizationId: payload.orgId || 'unknown',
      correlationId: payload.correlationId || 'unknown',
      occurredAt: new Date(),
      version: 1,
      payload: result,
    });
    
    return result;
  }
}
