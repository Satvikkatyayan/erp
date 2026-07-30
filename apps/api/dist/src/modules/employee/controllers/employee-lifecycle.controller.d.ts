import { EmployeeMapper } from '../api/mappers/employee.mapper';
import { OnboardEmployeeRequestDto, JoinEmployeeRequestDto, ConfirmEmployeeRequestDto, TransferEmployeeRequestDto, PromoteEmployeeRequestDto, ResignEmployeeRequestDto, TerminateEmployeeRequestDto, ExitEmployeeRequestDto, RehireEmployeeRequestDto } from '../api/dtos/requests.dto';
import { OnboardEmployeeHandler } from '../commands/handlers/onboard-employee.handler';
import { JoinEmployeeHandler } from '../commands/handlers/join-employee.handler';
import { BeginProbationHandler } from '../commands/handlers/begin-probation.handler';
import { ConfirmEmployeeHandler } from '../commands/handlers/confirm-employee.handler';
import { TransferEmployeeHandler } from '../commands/handlers/transfer-employee.handler';
import { PromoteEmployeeHandler } from '../commands/handlers/promote-employee.handler';
import { ResignEmployeeHandler } from '../commands/handlers/resign-employee.handler';
import { TerminateEmployeeHandler } from '../commands/handlers/terminate-employee.handler';
import { ExitEmployeeHandler } from '../commands/handlers/exit-employee.handler';
import { RehireEmployeeHandler } from '../commands/handlers/rehire-employee.handler';
export declare class EmployeeLifecycleController {
    private readonly mapper;
    private readonly onboardHandler;
    private readonly joinHandler;
    private readonly probationHandler;
    private readonly confirmHandler;
    private readonly transferHandler;
    private readonly promoteHandler;
    private readonly resignHandler;
    private readonly terminateHandler;
    private readonly exitHandler;
    private readonly rehireHandler;
    constructor(mapper: EmployeeMapper, onboardHandler: OnboardEmployeeHandler, joinHandler: JoinEmployeeHandler, probationHandler: BeginProbationHandler, confirmHandler: ConfirmEmployeeHandler, transferHandler: TransferEmployeeHandler, promoteHandler: PromoteEmployeeHandler, resignHandler: ResignEmployeeHandler, terminateHandler: TerminateEmployeeHandler, exitHandler: ExitEmployeeHandler, rehireHandler: RehireEmployeeHandler);
    onboardEmployee(tenantId: string, dto: OnboardEmployeeRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    joinEmployee(tenantId: string, employeeId: string, dto: JoinEmployeeRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    beginProbation(tenantId: string, employeeId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    confirmEmployee(tenantId: string, employeeId: string, dto: ConfirmEmployeeRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    transferEmployee(tenantId: string, employeeId: string, dto: TransferEmployeeRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    promoteEmployee(tenantId: string, employeeId: string, dto: PromoteEmployeeRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    resignEmployee(tenantId: string, employeeId: string, dto: ResignEmployeeRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    terminateEmployee(tenantId: string, employeeId: string, dto: TerminateEmployeeRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    exitEmployee(tenantId: string, employeeId: string, dto: ExitEmployeeRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    rehireEmployee(tenantId: string, employeeId: string, dto: RehireEmployeeRequestDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
}
//# sourceMappingURL=employee-lifecycle.controller.d.ts.map