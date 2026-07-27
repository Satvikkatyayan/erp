import * as fs from 'fs';
import * as path from 'path';

function verify() {
  const expenseDir = path.join(__dirname, '..');
  
  // 1. Check ReadModelVersion in interfaces
  const readModelVersionPath = path.join(expenseDir, 'interfaces', 'projections', 'read-model-version.interface.ts');
  if (!fs.existsSync(readModelVersionPath)) throw new Error('Missing ReadModelVersion interface');

  const budgetProjPath = path.join(expenseDir, 'interfaces', 'projections', 'budget.projection.ts');
  const budgetProjContent = fs.readFileSync(budgetProjPath, 'utf8');
  if (!budgetProjContent.includes('extends ReadModelVersion')) {
    throw new Error('BudgetProjection does not extend ReadModelVersion');
  }

  // 2. Check ProjectionHandler
  const projHandlerPath = path.join(expenseDir, 'interfaces', 'projections', 'projection-handler.interface.ts');
  if (!fs.existsSync(projHandlerPath)) throw new Error('Missing ProjectionHandler interface');

  // 3. Check Projection Registry
  const registryPath = path.join(expenseDir, 'projections', 'registry', 'projection.registry.ts');
  if (!fs.existsSync(registryPath)) throw new Error('Missing ProjectionRegistry');

  // 4. Check Projection Metadata
  const metadataPath = path.join(expenseDir, 'projections', 'services', 'projection-metadata.service.ts');
  if (!fs.existsSync(metadataPath)) throw new Error('Missing ProjectionMetadataService');

  // 5. Check Projection Services
  const servicesDir = path.join(expenseDir, 'projections', 'services');
  const expectedServices = [
    'expense-projection.service.ts',
    'travel-projection.service.ts',
    'budget-projection.service.ts',
    'risk-projection.service.ts',
    'approval-projection.service.ts'
  ];
  for (const s of expectedServices) {
    if (!fs.existsSync(path.join(servicesDir, s))) throw new Error(`Missing service: ${s}`);
  }

  // 6. Check Worker
  const workerPath = path.join(expenseDir, 'projections', 'workers', 'projection.worker.ts');
  if (!fs.existsSync(workerPath)) throw new Error('Missing ProjectionWorker');

  // 7. Check Replay Engine
  const enginePath = path.join(expenseDir, 'projections', 'engine', 'projection-replay.engine.ts');
  if (!fs.existsSync(enginePath)) throw new Error('Missing ProjectionReplayEngine');

  // 8. Check Health Service
  const healthPath = path.join(expenseDir, 'projections', 'health', 'projection-health.service.ts');
  if (!fs.existsSync(healthPath)) throw new Error('Missing ProjectionHealthService');

  console.log('✅ Expense Projection Infrastructure Verification Passed!');
}

verify();
