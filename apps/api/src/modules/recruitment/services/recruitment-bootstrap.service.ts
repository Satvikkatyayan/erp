import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class RecruitmentBootstrapService implements OnModuleInit {
  private readonly logger = new Logger(RecruitmentBootstrapService.name);

  constructor(private readonly sdk: PlatformSDK) {}

  async onModuleInit() {
    this.logger.log('Bootstrapping Recruitment Reporting Datasets...');
    
    const ctx: any = {
      tenantId: 'system',
      organizationId: 'system',
      userId: 'system',
      correlationId: 'bootstrap-rec-001',
      featureFlags: {}
    };

    const datasets = [
      { name: 'RecruitmentFunnelDataset', fields: { totalApplied: 'Int', shortlisted: 'Int', interviewed: 'Int', hired: 'Int' } },
      { name: 'CandidateDemographicsDataset', fields: { source: 'String', location: 'String', experienceYears: 'Int' } },
      { name: 'TimeToCheckDataset', fields: { averageDays: 'Float', byDepartment: 'Json' } }
    ];

    for (const ds of datasets) {
      await this.sdk.reporting.registerDataset(ctx, ds.name, ds.fields);
    }
  }
}
