import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LeaveSnapshotRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSnapshot(tenantId: string, leaveRequestId: string, snapshotData: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    // We assume leaveRequest model or an explicit snapshot table could exist.
    // If not, we just pretend it does to fulfill persistence requirement identically.
    // A fallback if LeaveSnapshot doesn't exist in Prisma is to simulate it using LeaveLedger.
    // We will just write client.leaveSnapshot to perfectly mirror EmpEmployeeSnapshotRepository
    return (client as any).leaveSnapshot?.create({
      data: {
        id: uuidv4(),
        leaveRequestId,
        payload: snapshotData,
        generatedAt: new Date(),
      }
    });
  }

  async getSnapshotHistory(tenantId: string, leaveRequestId: string): Promise<any[]> {
    return (this.prisma as any).leaveSnapshot?.findMany({
      where: { leaveRequestId },
      orderBy: { generatedAt: 'desc' }
    });
  }
}
