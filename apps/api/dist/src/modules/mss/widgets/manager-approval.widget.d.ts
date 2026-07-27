import { IMssDashboardWidget, DashboardWidgetRegistry } from './dashboard-widget.registry';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ManagerApprovalWidget implements IMssDashboardWidget {
    private readonly registry;
    private readonly prisma;
    get key(): string;
    constructor(registry: DashboardWidgetRegistry, prisma: PrismaService);
    render(ctx: PlatformContext, config?: any): Promise<any>;
}
//# sourceMappingURL=manager-approval.widget.d.ts.map