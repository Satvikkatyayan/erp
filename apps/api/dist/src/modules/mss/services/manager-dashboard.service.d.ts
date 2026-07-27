import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { DashboardWidgetRegistry } from '../widgets/dashboard-widget.registry';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ManagerDashboardService {
    private readonly widgetRegistry;
    private readonly prisma;
    private readonly logger;
    constructor(widgetRegistry: DashboardWidgetRegistry, prisma: PrismaService);
    getDashboard(ctx: PlatformContext): Promise<{
        widgets: {};
    }>;
}
//# sourceMappingURL=manager-dashboard.service.d.ts.map