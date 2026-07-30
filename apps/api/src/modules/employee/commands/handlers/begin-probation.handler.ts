import { Injectable } from '@nestjs/common';
import { BeginProbationCommand } from '../begin-probation.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class BeginProbationHandler {
  constructor(
    private readonly executionService: EmployeeExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: BeginProbationCommand): Promise<void> {
    const result = await this.executionService.beginProbation(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
