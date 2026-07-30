import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { EmpEmployeeRepository } from '../repositories/employee.repository';
import { EmpJobAssignmentRepository } from '../repositories/job-assignment.repository';
import { EmpEmployeeTimelineRepository } from '../repositories/timeline.repository';
import { EmpEmployeeSnapshotRepository } from '../repositories/snapshot.repository';
import { ExecutionResult } from '../../../core/cqrs/execution-result';
import { OnboardEmployeeCommand } from '../commands/onboard-employee.command';
import { ConfirmEmployeeCommand } from '../commands/confirm-employee.command';
import { JoinEmployeeCommand } from '../commands/join-employee.command';
import { BeginProbationCommand } from '../commands/begin-probation.command';
import { TransferEmployeeCommand } from '../commands/transfer-employee.command';
import { PromoteEmployeeCommand } from '../commands/promote-employee.command';
import { ResignEmployeeCommand } from '../commands/resign-employee.command';
import { TerminateEmployeeCommand } from '../commands/terminate-employee.command';
import { ExitEmployeeCommand } from '../commands/exit-employee.command';
import { RehireEmployeeCommand } from '../commands/rehire-employee.command';
export declare class EmployeeExecutionService {
    private readonly prisma;
    private readonly sdk;
    private readonly employeeRepo;
    private readonly jobAssignmentRepo;
    private readonly timelineRepo;
    private readonly snapshotRepo;
    constructor(prisma: PrismaService, sdk: PlatformSDK, employeeRepo: EmpEmployeeRepository, jobAssignmentRepo: EmpJobAssignmentRepository, timelineRepo: EmpEmployeeTimelineRepository, snapshotRepo: EmpEmployeeSnapshotRepository);
    onboardEmployee(command: OnboardEmployeeCommand): Promise<ExecutionResult<any>>;
    joinEmployee(command: JoinEmployeeCommand): Promise<ExecutionResult<any>>;
    beginProbation(command: BeginProbationCommand): Promise<ExecutionResult<any>>;
    confirmEmployee(command: ConfirmEmployeeCommand): Promise<ExecutionResult<any>>;
    transferEmployee(command: TransferEmployeeCommand): Promise<ExecutionResult<any>>;
    promoteEmployee(command: PromoteEmployeeCommand): Promise<ExecutionResult<any>>;
    resignEmployee(command: ResignEmployeeCommand): Promise<ExecutionResult<any>>;
    terminateEmployee(command: TerminateEmployeeCommand): Promise<ExecutionResult<any>>;
    exitEmployee(command: ExitEmployeeCommand): Promise<ExecutionResult<any>>;
    rehireEmployee(command: RehireEmployeeCommand): Promise<ExecutionResult<any>>;
}
//# sourceMappingURL=employee-execution.service.d.ts.map