import { ApproveLeaveCommand } from '../approve-leave.command';
import { LeaveExecutionService } from '../../services/leave-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class ApproveLeaveHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: LeaveExecutionService, publisher: PlatformEventPublisher);
    execute(command: ApproveLeaveCommand): Promise<void>;
}
//# sourceMappingURL=approve-leave.handler.d.ts.map