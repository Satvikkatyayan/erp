import { CancelLeaveCommand } from '../cancel-leave.command';
import { LeaveExecutionService } from '../../services/leave-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class CancelLeaveHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: LeaveExecutionService, publisher: PlatformEventPublisher);
    execute(command: CancelLeaveCommand): Promise<void>;
}
//# sourceMappingURL=cancel-leave.handler.d.ts.map