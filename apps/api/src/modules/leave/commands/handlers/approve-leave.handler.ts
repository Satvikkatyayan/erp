import { Injectable } from '@nestjs/common';
import { ApproveLeaveCommand } from '../approve-leave.command';
import { LeaveExecutionService } from '../../services/leave-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class ApproveLeaveHandler {
  constructor(
    private readonly executionService: LeaveExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: ApproveLeaveCommand): Promise<void> {
    const result = await this.executionService.approveLeave(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
