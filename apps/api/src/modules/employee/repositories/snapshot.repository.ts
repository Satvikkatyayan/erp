import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmpEmployeeSnapshotRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSnapshot(tenantId: string, employeeId: string, snapshotData: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.empEmployeeSnapshot.create({
      data: {
        id: uuidv4(),
        employeeId,
        payload: snapshotData,
        generatedAt: new Date(),
      }
    });
  }

  async getLatestSnapshot(tenantId: string, employeeId: string): Promise<any> {
    return this.prisma.empEmployeeSnapshot.findFirst({
      where: { employeeId },
      orderBy: { generatedAt: 'desc' }
    });
  }
}
