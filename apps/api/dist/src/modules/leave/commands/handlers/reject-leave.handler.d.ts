import { RejectLeaveCommand } from '../reject-leave.command';
import { LeaveExecutionService } from '../../services/leave-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class RejectLeaveHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: LeaveExecutionService, publisher: PlatformEventPublisher);
    execute(command: RejectLeaveCommand): Promise<void>;
}
//# sourceMappingURL=reject-leave.handler.d.ts.map