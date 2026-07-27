import { Injectable, Logger } from '@nestjs/common';
import { DatasetRegistry } from '../datasets/dataset-registry';

@Injectable()
export class ReportExecutionEngine {
  private readonly logger = new Logger(ReportExecutionEngine.name);

  constructor(private registry: DatasetRegistry) {}

  async execute(reportConfig: any, context: any) {
    const startTime = Date.now();
    const provider = this.registry.get(reportConfig.dataset);
    
    // 1. Fetch from provider with security trim
    let rawData = await provider.execute(reportConfig.query, context);
    
    // 2. Calculated Fields execution
    if (reportConfig.calculatedFields) {
      rawData = rawData.map(row => {
        const enriched = { ...row };
        for (const calc of reportConfig.calculatedFields) {
          // Mock expression eval: "salary * 12"
          if (calc.formula === 'salary * 12') {
             enriched[calc.name] = (row.salary || 0) * 12;
          }
        }
        return enriched;
      });
    }
    
    // 3. Multi-Dataset Join mock (If join present)
    if (reportConfig.joins) {
        this.logger.debug('Executing multi-dataset join mock');
        // Join logic would happen here in memory or via SQL query translation
        rawData = rawData.map(row => ({ ...row, _joined: true }));
    }
    
    // 4. Grouping / Aggregation mock
    let aggregated = rawData;
    if (reportConfig.query.groupBy) {
        const groups = {};
        for (const row of rawData) {
            const key = row[reportConfig.query.groupBy];
            if (!groups[key]) groups[key] = { count: 0, totalSalary: 0 };
            groups[key].count++;
            groups[key].totalSalary += row.salary || 0;
        }
        aggregated = Object.keys(groups).map(k => ({ [reportConfig.query.groupBy]: k, ...groups[k] }));
    }

    const durationMs = Date.now() - startTime;
    
    return {
      data: aggregated,
      explainability: {
        cacheHit: false,
        durationMs,
        datasetVersion: 'v1',
        filtersApplied: reportConfig.query.filters || {},
        securityTrimOrg: context.orgId,
        freshnessTimestamp: new Date().toISOString()
      },
      drillDownMetadata: {
        entity: reportConfig.dataset,
        navContext: '?source=report_id'
      }
    };
  }
}