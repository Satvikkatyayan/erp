import { EmployeeQueryService } from '../services/employee-query.service';
import { EmployeeProfileDto, EmployeeSummaryDto, JobAssignmentDto, TimelineEntryDto } from './dtos/employee-sdk.dto';
export declare class PlatformEmployeeSDK {
    private readonly queryService;
    constructor(queryService: EmployeeQueryService);
    getEmployeeProfile(tenantId: string, employeeId: string): Promise<EmployeeProfileDto | null>;
    getEmployeeSummary(tenantId: string, employeeId: string): Promise<EmployeeSummaryDto | null>;
    getEmploymentStatus(tenantId: string, employeeId: string): Promise<string | null>;
    isEmployeeActive(tenantId: string, employeeId: string): Promise<boolean>;
    exists(tenantId: string, employeeId: string): Promise<boolean>;
    getCurrentAssignment(tenantId: string, employeeId: string): Promise<JobAssignmentDto | null>;
    getCurrentDepartment(tenantId: string, employeeId: string): Promise<string | null>;
    getCurrentDesignation(tenantId: string, employeeId: string): Promise<string | null>;
    getCurrentManager(tenantId: string, employeeId: string): Promise<string | null>;
    getCurrentProject(tenantId: string, employeeId: string): Promise<string | null>;
    getAssignmentHistory(tenantId: string, employeeId: string): Promise<JobAssignmentDto[]>;
    getTimeline(tenantId: string, employeeId: string): Promise<TimelineEntryDto[]>;
    searchEmployees(tenantId: string, filters?: any): Promise<EmployeeSummaryDto[]>;
    getEmployeesByManager(tenantId: string, managerId: string): Promise<EmployeeSummaryDto[]>;
    getEmployeesByDepartment(tenantId: string, departmentId: string): Promise<EmployeeSummaryDto[]>;
    getEmployeesByProject(tenantId: string, projectId: string): Promise<EmployeeSummaryDto[]>;
    getEmployeesByOrganization(tenantId: string, organizationId: string): Promise<EmployeeSummaryDto[]>;
    getEmployeesByBranch(tenantId: string, branchId: string): Promise<EmployeeSummaryDto[]>;
    getJoiningDate(tenantId: string, employeeId: string): Promise<Date | null>;
    getConfirmationStatus(tenantId: string, employeeId: string): Promise<boolean>;
    isOnProbation(tenantId: string, employeeId: string): Promise<boolean>;
    hasCompletedProbation(tenantId: string, employeeId: string): Promise<boolean>;
    isExited(tenantId: string, employeeId: string): Promise<boolean>;
    getExitInformation(tenantId: string, employeeId: string): Promise<any>;
    validateEmployee(tenantId: string, employeeId: string): Promise<void>;
    validateActiveEmployee(tenantId: string, employeeId: string): Promise<void>;
    getTeamScopeIds(ctx: any, employeeId: string, allowIndirect: boolean, maxDepth: number): Promise<string[]>;
}
//# sourceMappingURL=platform-employee.sdk.d.ts.map