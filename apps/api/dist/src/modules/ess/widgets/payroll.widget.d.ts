import { OnModuleInit } from '@nestjs/common';
import { IDashboardWidget, DashboardWidgetProvider } from './dashboard-widget.provider';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PayrollQueryService } from '../../payroll/services/payroll-query.service';
export declare class PayrollWidget implements IDashboardWidget, OnModuleInit {
    private readonly provider;
    private readonly queryService;
    readonly widgetKey = "Payroll";
    constructor(provider: DashboardWidgetProvider, queryService: PayrollQueryService);
    onModuleInit(): void;
    getData(ctx: PlatformContext): Promise<{
        type: string;
        title: string;
        data: {
            period: string;
            netPay: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            status: string;
        };
    }>;
}
//# sourceMappingURL=payroll.widget.d.ts.map