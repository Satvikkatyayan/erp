import { Injectable, OnModuleInit } from '@nestjs/common';
import { IDashboardWidget, DashboardWidgetProvider } from './dashboard-widget.provider';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PayrollQueryService } from '../../payroll/services/payroll-query.service';

@Injectable()
export class PayrollWidget implements IDashboardWidget, OnModuleInit {
  readonly widgetKey = 'Payroll';

  constructor(
    private readonly provider: DashboardWidgetProvider,
    private readonly queryService: PayrollQueryService
  ) {}

  onModuleInit() {
    this.provider.registerWidget(this);
  }

  async getData(ctx: PlatformContext) {
    const latest = await this.queryService.getLatestPayslip(ctx);
    return {
      type: 'Payroll',
      title: 'Latest Payslip',
      data: latest ? {
        period: latest.payrollCycle.name,
        netPay: latest.netPay,
        currency: 'USD',
        status: latest.status
      } : null
    };
  }
}
