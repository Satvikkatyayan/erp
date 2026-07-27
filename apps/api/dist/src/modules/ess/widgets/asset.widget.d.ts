import { OnModuleInit } from '@nestjs/common';
import { IDashboardWidget, DashboardWidgetProvider } from './dashboard-widget.provider';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { AssetQueryService } from '../../assets/services/asset-query.service';
export declare class AssetWidget implements IDashboardWidget, OnModuleInit {
    private readonly provider;
    private readonly queryService;
    readonly widgetKey = "Assets";
    constructor(provider: DashboardWidgetProvider, queryService: AssetQueryService);
    onModuleInit(): void;
    getData(ctx: PlatformContext): Promise<{
        type: string;
        title: string;
        data: {
            name: string;
            category: string;
            assignedDate: Date;
        }[];
    }>;
}
//# sourceMappingURL=asset.widget.d.ts.map