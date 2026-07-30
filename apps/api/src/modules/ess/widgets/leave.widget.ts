import { Injectable, OnModuleInit } from '@nestjs/common';
import { IDashboardWidget, DashboardWidgetProvider } from './dashboard-widget.provider';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { LeaveQueryService } from '../../leave/services/leave-query.service';

@Injectable()
export class LeaveWidget implements IDashboardWidget, OnModuleInit {
  readonly widgetKey = 'Leave';

  constructor(
    private readonly provider: DashboardWidgetProvider,
    private readonly queryService: LeaveQueryService
  ) {}

  onModuleInit() {
    this.provider.registerWidget(this);
  }

  async getData(ctx: PlatformContext) {
    const balances = await this.queryService.getLeaveBalances(ctx.tenantId!, ctx.employeeId!);
    return {
      type: 'Leave',
      title: 'Leave Balances',
      data: balances
    };
  }
}
