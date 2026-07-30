import { Injectable } from '@nestjs/common';
import { PromoteEmployeeCommand } from '../promote-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class PromoteEmployeeHandler {
  constructor(
    private readonly executionService: EmployeeExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: PromoteEmployeeCommand): Promise<void> {
    const result = await this.executionService.promoteEmployee(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
