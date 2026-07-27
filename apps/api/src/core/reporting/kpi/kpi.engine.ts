import { Injectable, Logger } from '@nestjs/common';
import { ReportExecutionEngine } from '../engine/report-execution.engine';

@Injectable()
export class KPIEngine {
  private readonly logger = new Logger(KPIEngine.name);

  constructor(private engine: ReportExecutionEngine) {}

  async evaluateKPI(kpiDef: any, context: any) {
    const res = await this.engine.execute({
      dataset: kpiDef.dataset,
      query: kpiDef.query
    }, context);
    
    // Evaluate mock formula: AVG(salary)
    const val = res.data.reduce((acc, r) => acc + (r.salary || 0), 0) / (res.data.length || 1);
    
    const exceeded = val > kpiDef.thresholds.warning;
    if (exceeded) {
        this.logger.warn(`KPI Alert: Threshold Exceeded (Value: ${val} > ${kpiDef.thresholds.warning})`);
    }

    return { value: val, exceeded, explainability: res.explainability };
  }
}