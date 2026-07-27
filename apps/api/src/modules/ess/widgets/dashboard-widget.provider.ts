import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

export interface IDashboardWidget {
  readonly widgetKey: string;
  getData(ctx: PlatformContext): Promise<any>;
}

@Injectable()
export class DashboardWidgetProvider {
  private readonly logger = new Logger(DashboardWidgetProvider.name);
  private widgets = new Map<string, IDashboardWidget>();

  registerWidget(widget: IDashboardWidget) {
    this.widgets.set(widget.widgetKey, widget);
    this.logger.debug(`Registered widget ${widget.widgetKey}`);
  }

  async getWidgetData(ctx: PlatformContext, widgetKey: string) {
    const widget = this.widgets.get(widgetKey);
    if (!widget) return null;
    return widget.getData(ctx);
  }
  
  getAvailableWidgets() {
    return Array.from(this.widgets.keys());
  }
}
