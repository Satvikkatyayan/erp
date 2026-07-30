import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmpEmployeeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createEmployee(tenantId: string, organizationId: string, employeeNumber: string, status: string, tx?: any): Promise<any>;
    getEmployeeById(tenantId: string, id: string, tx?: any): Promise<any>;
    findEmployeeById(tenantId: string, id: string, tx?: any): Promise<any>;
    findEmployeesByDepartment(tenantId: string, departmentId: string, filters?: any, sort?: any, tx?: any): Promise<any[]>;
    findEmployeesByManager(tenantId: string, managerId: string, filters?: any, sort?: any, tx?: any): Promise<any[]>;
    updateEmployeeStatus(tenantId: string, id: string, status: string, tx?: any): Promise<any>;
    exists(tenantId: string, id: string, tx?: any): Promise<boolean>;
    findEmployeesByProject(tenantId: string, projectId: string, filters?: any, sort?: any, tx?: any): Promise<any[]>;
    findEmployeesByOrganization(tenantId: string, organizationId: string, filters?: any, sort?: any, tx?: any): Promise<any[]>;
    findEmployeesByBranch(tenantId: string, branchId: string, filters?: any, sort?: any, tx?: any): Promise<any[]>;
    searchEmployees(tenantId: string, filters: any, sort?: any, tx?: any): Promise<any[]>;
}
//# sourceMappingURL=employee.repository.d.ts.map