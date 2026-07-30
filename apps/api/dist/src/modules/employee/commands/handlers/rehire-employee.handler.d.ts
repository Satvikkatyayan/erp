import { RehireEmployeeCommand } from '../rehire-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class RehireEmployeeHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: EmployeeExecutionService, publisher: PlatformEventPublisher);
    execute(command: RehireEmployeeCommand): Promise<void>;
}
//# sourceMappingURL=rehire-employee.handler.d.ts.map