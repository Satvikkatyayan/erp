import { ExitEmployeeCommand } from '../exit-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class ExitEmployeeHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: EmployeeExecutionService, publisher: PlatformEventPublisher);
    execute(command: ExitEmployeeCommand): Promise<void>;
}
//# sourceMappingURL=exit-employee.handler.d.ts.map