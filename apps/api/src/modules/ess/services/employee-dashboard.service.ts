import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { DashboardWidgetProvider } from '../widgets/dashboard-widget.provider';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class EmployeeDashboardService {
  private readonly logger = new Logger(EmployeeDashboardService.name);

  constructor(
    private readonly provider: DashboardWidgetProvider,
    private readonly prisma: PrismaService
  ) {}

  async getDashboard(ctx: PlatformContext) {
    // 1. Get user preferences
    const prefs = await this.prisma.essDashboardWidget.findMany({
      where: { employeeId: ctx.employeeId, isVisible: true },
      orderBy: { order: 'asc' }
    });

    let widgetKeys = prefs.map(p => p.widgetKey);

    // Default if none explicitly configured
    if (widgetKeys.length === 0) {
      widgetKeys = this.provider.getAvailableWidgets();
    }

    const widgets = [];
    for (const key of widgetKeys) {
      try {
        const data = await this.provider.getWidgetData(ctx, key);
        if (data) {
          widgets.push({
            key,
            ...data
          });
        }
      } catch (err) {
        this.logger.error(`Failed to fetch widget ${key}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // Get shortcuts
    const shortcuts = await this.prisma.essEmployeeShortcut.findMany({
      where: { employeeId: ctx.employeeId },
      orderBy: { order: 'asc' }
    });

    return {
      widgets,
      shortcuts
    };
  }
}
