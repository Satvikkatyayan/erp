import { Injectable } from '@nestjs/common';
import { JoinEmployeeCommand } from '../join-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class JoinEmployeeHandler {
  constructor(
    private readonly executionService: EmployeeExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: JoinEmployeeCommand): Promise<void> {
    const result = await this.executionService.joinEmployee(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
