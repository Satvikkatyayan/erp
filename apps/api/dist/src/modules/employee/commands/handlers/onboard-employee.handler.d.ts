import { OnboardEmployeeCommand } from '../onboard-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class OnboardEmployeeHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: EmployeeExecutionService, publisher: PlatformEventPublisher);
    execute(command: OnboardEmployeeCommand): Promise<void>;
}
//# sourceMappingURL=onboard-employee.handler.d.ts.map