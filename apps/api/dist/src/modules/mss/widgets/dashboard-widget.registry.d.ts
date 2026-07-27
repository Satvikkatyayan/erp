import { PlatformContext } from '../../../core/contracts/context/platform-context';
export interface IMssDashboardWidget {
    get key(): string;
    render(ctx: PlatformContext, config?: any): Promise<any>;
}
export declare class DashboardWidgetRegistry {
    private readonly logger;
    private widgets;
    register(widget: IMssDashboardWidget): void;
    get(key: string): IMssDashboardWidget | undefined;
    getAll(): IMssDashboardWidget[];
}
//# sourceMappingURL=dashboard-widget.registry.d.ts.map