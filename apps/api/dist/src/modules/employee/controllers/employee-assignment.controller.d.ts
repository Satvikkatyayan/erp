import { EmployeeMapper } from '../api/mappers/employee.mapper';
import { GetCurrentAssignmentHandler } from '../queries/handlers/get-current-assignment.handler';
import { GetAssignmentHistoryHandler } from '../queries/handlers/get-assignment-history.handler';
export declare class EmployeeAssignmentController {
    private readonly mapper;
    private readonly currentAssignmentHandler;
    private readonly assignmentHistoryHandler;
    constructor(mapper: EmployeeMapper, currentAssignmentHandler: GetCurrentAssignmentHandler, assignmentHistoryHandler: GetAssignmentHistoryHandler);
    getCurrentAssignment(tenantId: string, employeeId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    getAssignmentHistory(tenantId: string, employeeId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any[]>>;
}
//# sourceMappingURL=employee-assignment.controller.d.ts.map