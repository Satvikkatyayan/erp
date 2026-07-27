import { Injectable, OnModuleInit } from '@nestjs/common';
import { IDashboardWidget, DashboardWidgetProvider } from './dashboard-widget.provider';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { AttendanceQueryService } from '../../attendance/services/attendance-query.service';

@Injectable()
export class AttendanceWidget implements IDashboardWidget, OnModuleInit {
  readonly widgetKey = 'Attendance';

  constructor(
    private readonly provider: DashboardWidgetProvider,
    private readonly queryService: AttendanceQueryService
  ) {}

  onModuleInit() {
    this.provider.registerWidget(this);
  }

  async getData(ctx: PlatformContext) {
    const today = await this.queryService.getTodaySummary(ctx);
    return {
      type: 'Attendance',
      title: 'Today\'s Attendance',
      data: today || { status: 'Not Punched In' }
    };
  }
}
