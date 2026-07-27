import { PlatformContext } from '../../../core/contracts/context/platform-context';
export interface IDashboardWidget {
    readonly widgetKey: string;
    getData(ctx: PlatformContext): Promise<any>;
}
export declare class DashboardWidgetProvider {
    private readonly logger;
    private widgets;
    registerWidget(widget: IDashboardWidget): void;
    getWidgetData(ctx: PlatformContext, widgetKey: string): Promise<any>;
    getAvailableWidgets(): string[];
}
//# sourceMappingURL=dashboard-widget.provider.d.ts.map