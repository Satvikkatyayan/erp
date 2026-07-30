import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LeaveRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createLeaveRequest(tenantId: string, data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.leaveRequest.create({
      data: {
        id: uuidv4(),
        tenantId,
        ...data
      }
    });
  }

  async findLeaveRequestById(tenantId: string, id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.leaveRequest.findFirst({
      where: { tenantId, id }
    });
  }

  async findLeaveRequestByNumber(tenantId: string, leaveNumber: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.leaveRequest.findFirst({
      where: { tenantId, leaveNumber }
    });
  }

  async updateLeaveRequest(tenantId: string, id: string, data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.leaveRequest.updateMany({
      where: { tenantId, id },
      data
    });
  }

  async deleteLeaveRequest(tenantId: string, id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.leaveRequest.deleteMany({
      where: { tenantId, id }
    });
  }

  async searchLeaveRequests(tenantId: string, filters: any, sort?: any, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    const orderBy = sort || { createdAt: 'desc' };
    return client.leaveRequest.findMany({
      where: { tenantId, ...filters },
      orderBy
    });
  }
}
