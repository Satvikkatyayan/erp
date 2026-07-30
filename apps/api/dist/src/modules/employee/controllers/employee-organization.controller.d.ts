import { EmployeeMapper } from '../api/mappers/employee.mapper';
import { GetEmployeesByManagerHandler } from '../queries/handlers/get-employees-by-manager.handler';
import { GetEmployeesByDepartmentHandler } from '../queries/handlers/get-employees-by-department.handler';
import { GetEmployeesByProjectHandler } from '../queries/handlers/get-employees-by-project.handler';
import { GetEmployeesByOrganizationHandler } from '../queries/handlers/get-employees-by-organization.handler';
import { GetEmployeesByBranchHandler } from '../queries/handlers/get-employees-by-branch.handler';
export declare class EmployeeOrganizationController {
    private readonly mapper;
    private readonly managerHandler;
    private readonly departmentHandler;
    private readonly projectHandler;
    private readonly orgHandler;
    private readonly branchHandler;
    constructor(mapper: EmployeeMapper, managerHandler: GetEmployeesByManagerHandler, departmentHandler: GetEmployeesByDepartmentHandler, projectHandler: GetEmployeesByProjectHandler, orgHandler: GetEmployeesByOrganizationHandler, branchHandler: GetEmployeesByBranchHandler);
    getByManager(tenantId: string, managerId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any[]>>;
    getByDepartment(tenantId: string, departmentId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any[]>>;
    getByProject(tenantId: string, projectId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any[]>>;
    getByOrganization(tenantId: string, organizationId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any[]>>;
    getByBranch(tenantId: string, branchId: string): Promise<import("../api/dtos/responses.dto").APIResponseDto<any[]>>;
}
//# sourceMappingURL=employee-organization.controller.d.ts.map