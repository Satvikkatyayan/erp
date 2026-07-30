import { Injectable } from '@nestjs/common';
import { TransferEmployeeCommand } from '../transfer-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class TransferEmployeeHandler {
  constructor(
    private readonly executionService: EmployeeExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: TransferEmployeeCommand): Promise<void> {
    const result = await this.executionService.transferEmployee(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
