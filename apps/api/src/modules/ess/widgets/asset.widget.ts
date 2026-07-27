import { Injectable, OnModuleInit } from '@nestjs/common';
import { IDashboardWidget, DashboardWidgetProvider } from './dashboard-widget.provider';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { AssetQueryService } from '../../assets/services/asset-query.service';

@Injectable()
export class AssetWidget implements IDashboardWidget, OnModuleInit {
  readonly widgetKey = 'Assets';

  constructor(
    private readonly provider: DashboardWidgetProvider,
    private readonly queryService: AssetQueryService
  ) {}

  onModuleInit() {
    this.provider.registerWidget(this);
  }

  async getData(ctx: PlatformContext) {
    const assets = await this.queryService.getAssignedAssets(ctx);
    return {
      type: 'Assets',
      title: 'Assigned Assets',
      data: assets.map(a => ({
        name: a.asset.name,
        category: a.asset.category.name,
        assignedDate: a.assignedAt
      }))
    };
  }
}
