import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

export interface IMssDashboardWidget {
  get key(): string;
  render(ctx: PlatformContext, config?: any): Promise<any>;
}

@Injectable()
export class DashboardWidgetRegistry {
  private readonly logger = new Logger(DashboardWidgetRegistry.name);
  private widgets: Map<string, IMssDashboardWidget> = new Map();

  register(widget: IMssDashboardWidget) {
    this.widgets.set(widget.key, widget);
    this.logger.debug(`Registered MSS widget ${widget.key}`);
  }

  get(key: string): IMssDashboardWidget | undefined {
    return this.widgets.get(key);
  }

  getAll(): IMssDashboardWidget[] {
    return Array.from(this.widgets.values());
  }
}
