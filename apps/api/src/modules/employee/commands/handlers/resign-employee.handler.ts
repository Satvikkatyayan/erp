import { Injectable } from '@nestjs/common';
import { ResignEmployeeCommand } from '../resign-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class ResignEmployeeHandler {
  constructor(
    private readonly executionService: EmployeeExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: ResignEmployeeCommand): Promise<void> {
    const result = await this.executionService.resignEmployee(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
