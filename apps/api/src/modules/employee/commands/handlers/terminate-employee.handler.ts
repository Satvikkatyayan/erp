import { Injectable } from '@nestjs/common';
import { TerminateEmployeeCommand } from '../terminate-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class TerminateEmployeeHandler {
  constructor(
    private readonly executionService: EmployeeExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: TerminateEmployeeCommand): Promise<void> {
    const result = await this.executionService.terminateEmployee(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
