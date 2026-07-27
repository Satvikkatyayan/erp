import * as fs from 'fs';
import * as path from 'path';

function verify() {
  const expenseDir = path.join(__dirname, '..');
  const coreDir = path.join(expenseDir, '..', '..', 'core');
  
  // 1. Check Execution Contracts (Now in Core)
  const execInterfacesDir = path.join(coreDir, 'execution', 'interfaces');
  const contracts = ['IWorker.ts', 'IJobScheduler.ts', 'IRetryPolicy.ts', 'IExecutionContext.ts', 'IWorkerResult.ts'];
  for (const c of contracts) {
    if (!fs.existsSync(path.join(execInterfacesDir, c))) throw new Error(`Missing contract: ${c}`);
  }

  // 2. Check Execution Context
  if (!fs.existsSync(path.join(coreDir, 'execution', 'execution-context.ts'))) throw new Error('Missing ExecutionContext');

  // 3. Check Workers (Still in Expense)
  const workersDir = path.join(expenseDir, 'workers');
  const workers = [
    'receipt-ocr.worker.ts',
    'risk-assessment.worker.ts',
    'budget-reservation.worker.ts',
    'corporate-card-import.worker.ts',
    'reimbursement.worker.ts'
  ];
  for (const w of workers) {
    if (!fs.existsSync(path.join(workersDir, w))) throw new Error(`Missing worker: ${w}`);
  }
  // Check ProjectionWorker implementation of IWorker
  const projWorkerPath = path.join(expenseDir, 'projections', 'workers', 'projection.worker.ts');
  const projWorkerContent = fs.readFileSync(projWorkerPath, 'utf8');
  if (!projWorkerContent.includes('implements IWorker')) throw new Error('ProjectionWorker does not implement IWorker');

  // 4. Check Scheduler (Now in Core)
  if (!fs.existsSync(path.join(coreDir, 'execution', 'scheduler', 'expense.scheduler.ts'))) throw new Error('Missing ExpenseScheduler');

  // 5. Check Retry Framework (Now in Core)
  const retryDir = path.join(coreDir, 'retry');
  if (!fs.existsSync(path.join(retryDir, 'retry.policy.ts'))) throw new Error('Missing RetryPolicy');
  if (!fs.existsSync(path.join(retryDir, 'retry.decision.ts'))) throw new Error('Missing RetryDecision');
  if (!fs.existsSync(path.join(retryDir, 'retry.strategy.ts'))) throw new Error('Missing RetryStrategy');

  // 6. Check Job Envelope (Now in Core)
  if (!fs.existsSync(path.join(coreDir, 'execution', 'envelope', 'job.envelope.ts'))) throw new Error('Missing JobEnvelope');

  // 7. Check Failure Handling (Now in Core)
  const failureDir = path.join(coreDir, 'execution', 'failure');
  if (!fs.existsSync(path.join(failureDir, 'worker.failure.ts'))) throw new Error('Missing WorkerFailure');
  if (!fs.existsSync(path.join(failureDir, 'worker.exception.ts'))) throw new Error('Missing WorkerException');
  if (!fs.existsSync(path.join(failureDir, 'retry.exceeded.ts'))) throw new Error('Missing RetryExceeded');
  if (!fs.existsSync(path.join(failureDir, 'dead-letter.candidate.ts'))) throw new Error('Missing DeadLetterCandidate');

  // 8. Check Execution Registry (Now in Core)
  if (!fs.existsSync(path.join(coreDir, 'registry', 'worker.registry.ts'))) throw new Error('Missing WorkerRegistry');

  // 9. Check Monitoring (Now in Core)
  if (!fs.existsSync(path.join(coreDir, 'monitoring', 'health.contracts.ts'))) throw new Error('Missing Health Framework');

  console.log('✅ Execution Framework Verification Passed (now targeting Core)!');
}

verify();
