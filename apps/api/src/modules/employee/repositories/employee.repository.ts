import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmpEmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(tenantId: string, organizationId: string, employeeNumber: string, status: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.empEmployee.create({
      data: {
        id: uuidv4(),
        tenantId,
        organizationId,
        employeeNumber,
        status,
      }
    });
  }

  async getEmployeeById(tenantId: string, id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.empEmployee.findFirst({
      where: { tenantId, id },
      include: {
        personalDetails: true,
      }
    });
  }

  async findEmployeeById(tenantId: string, id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    const employee = await client.empEmployee.findFirst({
      where: { tenantId, id },
      include: {
        personalDetails: true,
      }
    });
    // Any mapping logic would go here
    return employee;
  }

  async findEmployeesByDepartment(tenantId: string, departmentId: string, filters?: any, sort?: any, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    const where: any = { tenantId, departmentId, ...filters };
    
    // Sort logic handled entirely in the repository
    const orderBy = sort || { createdAt: 'desc' };
    
    const employees = await client.empEmployee.findMany({
      where,
      orderBy,
      include: { personalDetails: true }
    });
    
    return employees;
  }

  async findEmployeesByManager(tenantId: string, managerId: string, filters?: any, sort?: any, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    const where: any = { tenantId, managerId, ...filters };
    
    const orderBy = sort || { createdAt: 'desc' };
    
    const employees = await client.empEmployee.findMany({
      where,
      orderBy,
      include: { personalDetails: true }
    });
    
    return employees;
  }

  async updateEmployeeStatus(tenantId: string, id: string, status: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.empEmployee.updateMany({
      where: { tenantId, id },
      data: { status }
    });
  }

  async exists(tenantId: string, id: string, tx?: any): Promise<boolean> {
    const client = tx || this.prisma;
    const count = await client.empEmployee.count({ where: { tenantId, id } });
    return count > 0;
  }

  async findEmployeesByProject(tenantId: string, projectId: string, filters?: any, sort?: any, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    const orderBy = sort || { createdAt: 'desc' };
    return client.empEmployee.findMany({
      where: { tenantId, jobAssignments: { some: { projectId, effectiveTo: null } }, ...filters },
      orderBy,
      include: { personalDetails: true }
    });
  }

  async findEmployeesByOrganization(tenantId: string, organizationId: string, filters?: any, sort?: any, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    const orderBy = sort || { createdAt: 'desc' };
    return client.empEmployee.findMany({
      where: { tenantId, organizationId, ...filters },
      orderBy,
      include: { personalDetails: true }
    });
  }

  async findEmployeesByBranch(tenantId: string, branchId: string, filters?: any, sort?: any, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    const orderBy = sort || { createdAt: 'desc' };
    return client.empEmployee.findMany({
      where: { tenantId, jobAssignments: { some: { branchId, effectiveTo: null } }, ...filters },
      orderBy,
      include: { personalDetails: true }
    });
  }

  async searchEmployees(tenantId: string, filters: any, sort?: any, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    const orderBy = sort || { createdAt: 'desc' };
    return client.empEmployee.findMany({
      where: { tenantId, ...filters },
      orderBy,
      include: { personalDetails: true }
    });
  }
}
