import { ApplyLeaveCommand } from '../apply-leave.command';
import { LeaveExecutionService } from '../../services/leave-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class ApplyLeaveHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: LeaveExecutionService, publisher: PlatformEventPublisher);
    execute(command: ApplyLeaveCommand): Promise<void>;
}
//# sourceMappingURL=apply-leave.handler.d.ts.map