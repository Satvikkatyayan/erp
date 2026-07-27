import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ManagerTeamService {
  private readonly logger = new Logger(ManagerTeamService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getDirectory(ctx: PlatformContext, scopeIds: string[]) {
    const employees = await this.prisma.empEmployee.findMany({
      where: { id: { in: scopeIds } },
      include: {
        personalDetails: true,
        jobAssignments: { where: { effectiveTo: null }, include: { position: true } }
      }
    });

    return employees.map(e => ({
      id: e.id,
      name: `${e.personalDetails?.firstName || ''} ${e.personalDetails?.lastName || ''}`.trim(),
      position: e.jobAssignments?.[0]?.position?.title || 'Unknown',
      status: e.status
    }));
  }
}
