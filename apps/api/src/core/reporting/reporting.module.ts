import { Module } from '@nestjs/common';
import { DatasetRegistry } from './datasets/dataset-registry';
import { MockEmployeeDatasetProvider } from './datasets/mock-employee.dataset';
import { ReportExecutionEngine } from './engine/report-execution.engine';
import { KPIEngine } from './kpi/kpi.engine';
import { PlatformReportingSDK } from './sdk/platform-reporting.sdk';

@Module({
  providers: [
    DatasetRegistry,
    MockEmployeeDatasetProvider,
    ReportExecutionEngine,
    KPIEngine,
    PlatformReportingSDK
  ],
  exports: [PlatformReportingSDK]
})
export class ReportingModule {}
