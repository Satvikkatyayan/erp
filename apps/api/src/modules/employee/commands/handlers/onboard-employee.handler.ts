import { Injectable } from '@nestjs/common';
import { OnboardEmployeeCommand } from '../onboard-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class OnboardEmployeeHandler {
  constructor(
    private readonly executionService: EmployeeExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: OnboardEmployeeCommand): Promise<void> {
    const result = await this.executionService.onboardEmployee(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
