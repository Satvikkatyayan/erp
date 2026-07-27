import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { DashboardWidgetRegistry } from '../widgets/dashboard-widget.registry';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ManagerDashboardService {
  private readonly logger = new Logger(ManagerDashboardService.name);

  constructor(
    private readonly widgetRegistry: DashboardWidgetRegistry,
    private readonly prisma: PrismaService
  ) {}

  async getDashboard(ctx: PlatformContext) {
    const widgets = await this.prisma.mssDashboardWidget.findMany({
      where: { managerId: ctx.employeeId },
      orderBy: { order: 'asc' }
    });

    const defaultWidgets = ['TeamSummary', 'ManagerApproval'];
    const activeWidgets = widgets.length > 0 ? widgets.map(w => w.widgetKey) : defaultWidgets;

    const payload = {};
    for (const key of activeWidgets) {
      const widget = this.widgetRegistry.get(key);
      if (widget) {
        try {
          payload[key] = await widget.render(ctx);
        } catch (e: any) {
          this.logger.error(`Failed to render widget ${key}: ${e.message}`);
        }
      }
    }
    return { widgets: payload };
  }
}
