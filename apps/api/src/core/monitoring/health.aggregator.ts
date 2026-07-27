import { Injectable } from '@nestjs/common';
import { HealthContributor, HealthReport, HealthStatus } from './health.contracts';

@Injectable()
export class HealthAggregator {
  private contributors: HealthContributor[] = [];

  register(contributor: HealthContributor) {
    this.contributors.push(contributor);
  }

  async getAggregateHealth(): Promise<{ status: HealthStatus; components: Record<string, HealthReport> }> {
    const components: Record<string, HealthReport> = {};
    let overallStatus = HealthStatus.UP;

    for (const contributor of this.contributors) {
      try {
        const report = await contributor.checkHealth();
        components[contributor.name] = report;
        if (report.status === HealthStatus.DOWN) overallStatus = HealthStatus.DOWN;
        if (report.status === HealthStatus.DEGRADED && overallStatus !== HealthStatus.DOWN) overallStatus = HealthStatus.DEGRADED;
      } catch (err: any) {
        components[contributor.name] = {
          status: HealthStatus.DOWN,
          error: err.message,
          timestamp: new Date()
        };
        overallStatus = HealthStatus.DOWN;
      }
    }

    return { status: overallStatus, components };
  }
}
