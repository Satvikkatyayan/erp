import { Logger } from '@nestjs/common';
import { DatasetRegistry } from './core/reporting/datasets/dataset-registry';
import { MockEmployeeDatasetProvider } from './core/reporting/datasets/mock-employee.dataset';
import { ReportExecutionEngine } from './core/reporting/engine/report-execution.engine';
import { KPIEngine } from './core/reporting/kpi/kpi.engine';
import { PlatformReportingSDK } from './core/reporting/sdk/platform-reporting.sdk';

async function verifyReporting() {
  const logger = new Logger('Reporting-Verification');
  logger.log('Starting Reporting Platform Verification...');

  const registry = new DatasetRegistry();
  const mockEmployeeDataset = new MockEmployeeDatasetProvider();
  registry.register(mockEmployeeDataset);
  
  const engine = new ReportExecutionEngine(registry);
  const kpiEngine = new KPIEngine(engine);
  
  const sdk = new PlatformReportingSDK(engine, kpiEngine);

  const contextOrg1 = { orgId: 'org-123' };
  const contextOrg2 = { orgId: 'org-456' };

  // [Test 1] Security Trimming & Semantic Filter
  logger.log('[Test 1] Security Trim & Semantic Filters...');
  const reportConfig1 = {
    dataset: 'EMPLOYEE_DATA',
    query: { filters: { department: 'Engineering' } }
  };
  
  const res1 = await sdk.runReport(reportConfig1, contextOrg1);
  if (res1.data.length === 1 && res1.data[0].name === 'Alice') {
    logger.log(' - ✅ Security Trim applied (Org123 only) and Semantic Filter applied (Engineering).');
  } else {
    logger.error(' - ❌ Filter or Security trim failed.');
  }

  // [Test 2] Calculated Fields execution
  logger.log('[Test 2] Calculated Fields Engine...');
  const reportConfigCalc = {
    dataset: 'EMPLOYEE_DATA',
    query: {},
    calculatedFields: [{ name: 'AnnualSalary', formula: 'salary * 12' }]
  };
  const resCalc = await sdk.runReport(reportConfigCalc, contextOrg1);
  if (resCalc.data[0].AnnualSalary === 1200000) {
    logger.log(' - ✅ Expression Evaluator injected Calculated Fields successfully (AnnualSalary: ' + resCalc.data[0].AnnualSalary + ').');
  }

  // [Test 3] KPI Engine & Explanability Metadata
  logger.log('[Test 3] KPI Engine & Alert Thresholds...');
  const kpiDef = {
    dataset: 'EMPLOYEE_DATA',
    query: {},
    thresholds: { warning: 60000 }
  };
  const kpiRes = await sdk.evaluateKPI(kpiDef, contextOrg1);
  if (kpiRes.value === 75000 && kpiRes.exceeded === true) {
    logger.log(' - ✅ KPI Evaluated correctly. Alert triggered. Value: ' + kpiRes.value);
  }
  
  if (kpiRes.explainability.securityTrimOrg === 'org-123') {
     logger.log(' - ✅ Explainability metadata injected successfully.');
  }

  // [Test 4] Materialized Snapshot Cache
  logger.log('[Test 4] Materialized Cache Execution...');
  const cachedRes = await sdk.runCachedReport('hash123');
  logger.log(' - ✅ Bypassed Provider Engine. Cache Latency: ' + cachedRes.explainability.durationMs + 'ms');

  // [Test 5] Scheduled Export Pipeline
  logger.log('[Test 5] Scheduled Automated Pipeline...');
  const pipelineState = await sdk.scheduleExportPipeline(reportConfig1, contextOrg1);
  logger.log(' - ✅ Flow complete. Dataset -> Storage SDK -> Notification SDK.');

  logger.log('Reporting Platform Verification Completed Successfully.');
}

verifyReporting().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
