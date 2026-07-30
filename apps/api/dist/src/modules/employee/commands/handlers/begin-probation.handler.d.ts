import { BeginProbationCommand } from '../begin-probation.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class BeginProbationHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: EmployeeExecutionService, publisher: PlatformEventPublisher);
    execute(command: BeginProbationCommand): Promise<void>;
}
//# sourceMappingURL=begin-probation.handler.d.ts.map