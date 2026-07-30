import { ResignEmployeeCommand } from '../resign-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class ResignEmployeeHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: EmployeeExecutionService, publisher: PlatformEventPublisher);
    execute(command: ResignEmployeeCommand): Promise<void>;
}
//# sourceMappingURL=resign-employee.handler.d.ts.map