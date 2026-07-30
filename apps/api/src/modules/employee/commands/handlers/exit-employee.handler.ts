import { Injectable } from '@nestjs/common';
import { ExitEmployeeCommand } from '../exit-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class ExitEmployeeHandler {
  constructor(
    private readonly executionService: EmployeeExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: ExitEmployeeCommand): Promise<void> {
    const result = await this.executionService.exitEmployee(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
