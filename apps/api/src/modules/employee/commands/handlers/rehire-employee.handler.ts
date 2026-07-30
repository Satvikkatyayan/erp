import { Injectable } from '@nestjs/common';
import { RehireEmployeeCommand } from '../rehire-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class RehireEmployeeHandler {
  constructor(
    private readonly executionService: EmployeeExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: RehireEmployeeCommand): Promise<void> {
    const result = await this.executionService.rehireEmployee(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
