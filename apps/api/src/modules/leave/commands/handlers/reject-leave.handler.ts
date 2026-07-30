import { Injectable } from '@nestjs/common';
import { RejectLeaveCommand } from '../reject-leave.command';
import { LeaveExecutionService } from '../../services/leave-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class RejectLeaveHandler {
  constructor(
    private readonly executionService: LeaveExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: RejectLeaveCommand): Promise<void> {
    const result = await this.executionService.rejectLeave(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
