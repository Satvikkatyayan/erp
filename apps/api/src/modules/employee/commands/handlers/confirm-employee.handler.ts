import { Injectable } from '@nestjs/common';
import { ConfirmEmployeeCommand } from '../confirm-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class ConfirmEmployeeHandler {
  constructor(
    private readonly executionService: EmployeeExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: ConfirmEmployeeCommand): Promise<void> {
    const result = await this.executionService.confirmEmployee(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
