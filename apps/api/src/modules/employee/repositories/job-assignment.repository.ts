import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmpJobAssignmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createJobAssignment(tenantId: string, employeeId: string, data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.empJobAssignment.create({
      data: {
        id: uuidv4(),
        employeeId,
        ...data
      }
    });
  }

  async getCurrentJobAssignment(tenantId: string, employeeId: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.empJobAssignment.findFirst({
      where: { employeeId, effectiveTo: null },
      orderBy: { effectiveFrom: 'desc' }
    });
  }

  async findCurrentJobAssignment(tenantId: string, employeeId: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    const assignment = await client.empJobAssignment.findFirst({
      where: { employeeId, effectiveTo: null },
      orderBy: { effectiveFrom: 'desc' }
    });
    // Add any repository-level mapping/transformation logic here
    return assignment;
  }

  async closeCurrentJobAssignment(tenantId: string, employeeId: string, effectiveTo: Date, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    const current = await this.getCurrentJobAssignment(tenantId, employeeId, tx);
    if (current) {
      return client.empJobAssignment.update({
        where: { id: current.id },
        data: { effectiveTo }
      });
    }
    return null;
  }

  async findAssignmentHistory(tenantId: string, employeeId: string, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    return client.empJobAssignment.findMany({
      where: { employeeId },
      orderBy: { effectiveFrom: 'desc' }
    });
  }
}
