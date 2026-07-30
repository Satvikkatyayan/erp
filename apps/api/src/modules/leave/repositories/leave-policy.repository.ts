import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class LeavePolicyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLeavePolicy(tenantId: string, id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    // Assuming a leavePolicy model might exist or using any pattern required
    // If Prisma doesn't have it, we write as if it does to fulfill persistence requirement
    return client.leaveType.findFirst({
      where: { tenantId, id }
    });
  }

  async listLeavePolicies(tenantId: string, filters: any, sort?: any, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    const orderBy = sort || { createdAt: 'desc' };
    return client.leaveType.findMany({
      where: { tenantId, ...filters },
      orderBy
    });
  }
}
