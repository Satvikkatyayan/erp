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
        data: ({
            leaveType: {
                name: string;
                id: string;
                organizationId: string;
                createdAt: Date;
                updatedAt: Date;
                version: number;
                deletedAt: Date | null;
                createdBy: string | null;
                updatedBy: string | null;
                isPaid: boolean;
            };
        } & {
            id: string;
            employeeId: string;
            createdAt: Date;
            updatedAt: Date;
            version: number;
            deletedAt: Date | null;
            createdBy: string | null;
            updatedBy: string | null;
            leaveTypeId: string;
            year: number;
            totalDays: import("@prisma/client/runtime/library").Decimal;
            usedDays: import("@prisma/client/runtime/library").Decimal;
        })[];
    }>;
}
//# sourceMappingURL=leave.widget.d.ts.map