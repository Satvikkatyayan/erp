import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class EmployeeHierarchyQueryService {
  private readonly logger = new Logger(EmployeeHierarchyQueryService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getDirectReports(ctx: PlatformContext, managerId: string) {
    const assignments = await this.prisma.empReportingAssignment.findMany({
      where: {
        managerId,
        effectiveTo: null,
      },
      include: {
        employee: true
      }
    });
    return assignments.map(a => a.employee);
  }

  async getIndirectReports(ctx: PlatformContext, managerId: string, maxDepth: number = 5) {
    const allReports = [];
    let currentLevelIds = [managerId];

    for (let depth = 1; depth <= maxDepth; depth++) {
      if (currentLevelIds.length === 0) break;
      
      const assignments = await this.prisma.empReportingAssignment.findMany({
        where: {
          managerId: { in: currentLevelIds },
          effectiveTo: null,
        },
        include: { employee: true }
      });

      if (assignments.length === 0) break;

      const employeesAtLevel = assignments.map(a => a.employee);
      // Avoid circular references
      const newIds = employeesAtLevel.map(e => e.id).filter(id => !allReports.some(r => r.id === id));
      
      const uniqueEmployees = employeesAtLevel.filter(e => newIds.includes(e.id));
      allReports.push(...uniqueEmployees);
      currentLevelIds = newIds;
    }

    return allReports;
  }

  async getTeamScopeIds(ctx: PlatformContext, managerId: string, includeIndirect: boolean = true, maxDepth: number = 5): Promise<string[]> {
    const directs = await this.getDirectReports(ctx, managerId);
    let ids = directs.map(e => e.id);
    
    if (includeIndirect) {
      const indirects = await this.getIndirectReports(ctx, managerId, maxDepth);
      indirects.forEach(e => {
        if (!ids.includes(e.id)) ids.push(e.id);
      });
    }
    return ids;
  }
}
