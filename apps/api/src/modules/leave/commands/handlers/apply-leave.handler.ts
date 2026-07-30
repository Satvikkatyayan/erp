import { Injectable } from '@nestjs/common';
import { ApplyLeaveCommand } from '../apply-leave.command';
import { LeaveExecutionService } from '../../services/leave-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class ApplyLeaveHandler {
  constructor(
    private readonly executionService: LeaveExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: ApplyLeaveCommand): Promise<void> {
    const result = await this.executionService.applyLeave(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
