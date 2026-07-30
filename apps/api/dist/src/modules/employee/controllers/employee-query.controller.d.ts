import { EmployeeMapper } from '../api/mappers/employee.mapper';
import { SearchEmployeesDto } from '../api/dtos/queries.dto';
import { GetEmployeeProfileHandler } from '../queries/handlers/get-employee-profile.handler';
import { GetEmployeeSummaryHandler } from '../queries/handlers/get-employee-summary.handler';
import { GetEmployeeTimelineHandler } from '../queries/handlers/get-employee-timeline.handler';
import { SearchEmployeesHandler } from '../queries/handlers/search-employees.handler';
import { GetEmploymentStatusHandler } from '../queries/handlers/get-employment-status.handler';
import { GetExitInformationHandler } from '../queries/handlers/get-exit-information.handler';
export declare class EmployeeQueryController {
    private readonly mapper;
    private readonly profileHandler;
    private readonly summaryHandler;
    private readonly timelineHandler;
    private readonly searchHandler;
    private readonly employmentStatusHandler;
    private readonly exitInfoHandler;
    constructor(mapper: EmployeeMapper, profileHandler: GetEmployeeProfileHandler, summaryHandler: GetEmployeeSummaryHandler, timelineHandler: GetEmployeeTimelineHandler, searchHandler: SearchEmployeesHandler, employmentStatusHandler: GetEmploymentStatusHandler, exitInfoHandler: GetExitInformationHandler);
    searchEmployees(tenantId: string, queryDto: SearchEmployeesDto): Promise<import("../api/dtos/responses.dto").APIResponseDto<any[]>>;
    getEmployeeProfile(tenantId: string, employeeId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    getEmployeeSummary(tenantId: string, employeeId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
    getEmployeeTimeline(tenantId: string, employeeId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any[]>>;
    getEmploymentStatus(tenantId: string, employeeId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<string>>;
    getExitInformation(tenantId: string, employeeId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any>>;
}
//# sourceMappingURL=employee-query.controller.d.ts.map