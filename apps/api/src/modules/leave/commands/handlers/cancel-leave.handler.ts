import { Injectable } from '@nestjs/common';
import { CancelLeaveCommand } from '../cancel-leave.command';
import { LeaveExecutionService } from '../../services/leave-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';

@Injectable()
export class CancelLeaveHandler {
  constructor(
    private readonly executionService: LeaveExecutionService,
    private readonly publisher: PlatformEventPublisher
  ) {}

  async execute(command: CancelLeaveCommand): Promise<void> {
    const result = await this.executionService.cancelLeave(command);
    
    for (const event of result.events) {
      this.publisher.publish(event);
    }
  }
}
