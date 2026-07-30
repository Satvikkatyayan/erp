import { JoinEmployeeCommand } from '../join-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class JoinEmployeeHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: EmployeeExecutionService, publisher: PlatformEventPublisher);
    execute(command: JoinEmployeeCommand): Promise<void>;
}
//# sourceMappingURL=join-employee.handler.d.ts.map