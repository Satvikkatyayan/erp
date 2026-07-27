"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function verify() {
    const expenseDir = path.join(__dirname, '..');
    const coreDir = path.join(expenseDir, '..', '..', 'core');
    const execInterfacesDir = path.join(coreDir, 'execution', 'interfaces');
    const contracts = ['IWorker.ts', 'IJobScheduler.ts', 'IRetryPolicy.ts', 'IExecutionContext.ts', 'IWorkerResult.ts'];
    for (const c of contracts) {
        if (!fs.existsSync(path.join(execInterfacesDir, c)))
            throw new Error(`Missing contract: ${c}`);
    }
    if (!fs.existsSync(path.join(coreDir, 'execution', 'execution-context.ts')))
        throw new Error('Missing ExecutionContext');
    const workersDir = path.join(expenseDir, 'workers');
    const workers = [
        'receipt-ocr.worker.ts',
        'risk-assessment.worker.ts',
        'budget-reservation.worker.ts',
        'corporate-card-import.worker.ts',
        'reimbursement.worker.ts'
    ];
    for (const w of workers) {
        if (!fs.existsSync(path.join(workersDir, w)))
            throw new Error(`Missing worker: ${w}`);
    }
    const projWorkerPath = path.join(expenseDir, 'projections', 'workers', 'projection.worker.ts');
    const projWorkerContent = fs.readFileSync(projWorkerPath, 'utf8');
    if (!projWorkerContent.includes('implements IWorker'))
        throw new Error('ProjectionWorker does not implement IWorker');
    if (!fs.existsSync(path.join(coreDir, 'execution', 'scheduler', 'expense.scheduler.ts')))
        throw new Error('Missing ExpenseScheduler');
    const retryDir = path.join(coreDir, 'retry');
    if (!fs.existsSync(path.join(retryDir, 'retry.policy.ts')))
        throw new Error('Missing RetryPolicy');
    if (!fs.existsSync(path.join(retryDir, 'retry.decision.ts')))
        throw new Error('Missing RetryDecision');
    if (!fs.existsSync(path.join(retryDir, 'retry.strategy.ts')))
        throw new Error('Missing RetryStrategy');
    if (!fs.existsSync(path.join(coreDir, 'execution', 'envelope', 'job.envelope.ts')))
        throw new Error('Missing JobEnvelope');
    const failureDir = path.join(coreDir, 'execution', 'failure');
    if (!fs.existsSync(path.join(failureDir, 'worker.failure.ts')))
        throw new Error('Missing WorkerFailure');
    if (!fs.existsSync(path.join(failureDir, 'worker.exception.ts')))
        throw new Error('Missing WorkerException');
    if (!fs.existsSync(path.join(failureDir, 'retry.exceeded.ts')))
        throw new Error('Missing RetryExceeded');
    if (!fs.existsSync(path.join(failureDir, 'dead-letter.candidate.ts')))
        throw new Error('Missing DeadLetterCandidate');
    if (!fs.existsSync(path.join(coreDir, 'registry', 'worker.registry.ts')))
        throw new Error('Missing WorkerRegistry');
    if (!fs.existsSync(path.join(coreDir, 'monitoring', 'health.contracts.ts')))
        throw new Error('Missing Health Framework');
    console.log('✅ Execution Framework Verification Passed (now targeting Core)!');
}
verify();
//# sourceMappingURL=verify-expense-workers.js.map