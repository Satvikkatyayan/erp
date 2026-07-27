import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { DashboardWidgetProvider } from '../widgets/dashboard-widget.provider';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmployeeDashboardService {
    private readonly provider;
    private readonly prisma;
    private readonly logger;
    constructor(provider: DashboardWidgetProvider, prisma: PrismaService);
    getDashboard(ctx: PlatformContext): Promise<{
        widgets: any[];
        shortcuts: {
            id: string;
            employeeId: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            label: string;
            url: string;
            icon: string | null;
        }[];
    }>;
}
//# sourceMappingURL=employee-dashboard.service.d.ts.map