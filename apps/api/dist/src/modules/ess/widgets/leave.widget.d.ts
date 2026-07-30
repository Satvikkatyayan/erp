import { OnModuleInit } from '@nestjs/common';
import { IDashboardWidget, DashboardWidgetProvider } from './dashboard-widget.provider';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { LeaveQueryService } from '../../leave/services/leave-query.service';
export declare class LeaveWidget implements IDashboardWidget, OnModuleInit {
    private readonly provider;
    private readonly queryService;
    readonly widgetKey = "Leave";
    constructor(provider: DashboardWidgetProvider, queryService: LeaveQueryService);
    onModuleInit(): void;
    getData(ctx: PlatformContext): Promise<{
        type: string;
        title: string;
        data: any[];
    }>;
}
//# sourceMappingURL=leave.widget.d.ts.map