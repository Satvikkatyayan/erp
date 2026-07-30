import { EmpEmployeeRepository } from '../repositories/employee.repository';
import { EmpJobAssignmentRepository } from '../repositories/job-assignment.repository';
import { EmpEmployeeTimelineRepository } from '../repositories/timeline.repository';
export declare class EmployeeQueryService {
    private readonly employeeRepo;
    private readonly jobAssignmentRepo;
    private readonly timelineRepo;
    constructor(employeeRepo: EmpEmployeeRepository, jobAssignmentRepo: EmpJobAssignmentRepository, timelineRepo: EmpEmployeeTimelineRepository);
    findEmployeeById(tenantId: string, employeeId: string): Promise<any>;
    findEmployeeSummary(tenantId: string, employeeId: string): Promise<any>;
    findEmploymentStatus(tenantId: string, employeeId: string): Promise<string | null>;
    isEmployeeActive(tenantId: string, employeeId: string): Promise<boolean>;
    exists(tenantId: string, employeeId: string): Promise<boolean>;
    findEmployeeJobAssignment(tenantId: string, employeeId: string): Promise<any>;
    findCurrentDepartment(tenantId: string, employeeId: string): Promise<string | null>;
    findCurrentDesignation(tenantId: string, employeeId: string): Promise<string | null>;
    findCurrentManager(tenantId: string, employeeId: string): Promise<string | null>;
    findCurrentProject(tenantId: string, employeeId: string): Promise<string | null>;
    findAssignmentHistory(tenantId: string, employeeId: string): Promise<any[]>;
    findTimeline(tenantId: string, employeeId: string): Promise<any[]>;
    searchEmployees(tenantId: string, filters?: any, sort?: any): Promise<any[]>;
    findEmployeesByManager(tenantId: string, managerId: string, filters?: any, sort?: any): Promise<any[]>;
    findEmployeesByDepartment(tenantId: string, departmentId: string, filters?: any, sort?: any): Promise<any[]>;
    findEmployeesByProject(tenantId: string, projectId: string, filters?: any, sort?: any): Promise<any[]>;
    findEmployeesByOrganization(tenantId: string, organizationId: string, filters?: any, sort?: any): Promise<any[]>;
    findEmployeesByBranch(tenantId: string, branchId: string, filters?: any, sort?: any): Promise<any[]>;
    findJoiningDate(tenantId: string, employeeId: string): Promise<Date | null>;
    findConfirmationStatus(tenantId: string, employeeId: string): Promise<boolean>;
    isOnProbation(tenantId: string, employeeId: string): Promise<boolean>;
    hasCompletedProbation(tenantId: string, employeeId: string): Promise<boolean>;
    isExited(tenantId: string, employeeId: string): Promise<boolean>;
    findExitInformation(tenantId: string, employeeId: string): Promise<any>;
    getTeamScopeIds(ctx: any, employeeId: string, allowIndirect: boolean, maxDepth: number): Promise<string[]>;
}
//# sourceMappingURL=employee-query.service.d.ts.map