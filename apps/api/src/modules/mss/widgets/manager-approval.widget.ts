import { Injectable } from '@nestjs/common';
import { IMssDashboardWidget, DashboardWidgetRegistry } from './dashboard-widget.registry';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ManagerApprovalWidget implements IMssDashboardWidget {
  get key(): string { return 'ManagerApproval'; }

  constructor(
    private readonly registry: DashboardWidgetRegistry,
    private readonly prisma: PrismaService
  ) {
    this.registry.register(this);
  }

  async render(ctx: PlatformContext, config?: any): Promise<any> {
    const pending = await this.prisma.mssApprovalView.count({
      where: { managerId: ctx.employeeId, status: 'PENDING' }
    });
    return {
      title: "Pending Approvals",
      count: pending
    };
  }
}
