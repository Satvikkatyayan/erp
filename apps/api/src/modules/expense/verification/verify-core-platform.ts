import * as fs from 'fs';
import * as path from 'path';

function verify() {
  const coreDir = path.join(__dirname, '..', '..', '..', 'core');

  // Check SDK
  const sdkFile = path.join(coreDir, 'sdk', 'index.ts');
  if (!fs.existsSync(sdkFile)) throw new Error('Missing SDK package');
  const sdkContent = fs.readFileSync(sdkFile, 'utf8');
  
  if (!sdkContent.includes('execution/interfaces')) throw new Error('SDK missing Execution');
  if (!sdkContent.includes('cqrs/cqrs.contracts')) throw new Error('SDK missing CQRS');
  if (!sdkContent.includes('registry/registry.interface')) throw new Error('SDK missing Registry');
  if (!sdkContent.includes('events/event.catalog')) throw new Error('SDK missing Event Catalog');
  if (!sdkContent.includes('monitoring/health.contracts')) throw new Error('SDK missing Monitoring');

  // Check new CQRS contracts
  if (!fs.existsSync(path.join(coreDir, 'cqrs', 'cqrs.contracts.ts'))) throw new Error('Missing CQRS contracts');

  // Check hybrid registry
  const registryDir = path.join(coreDir, 'registry');
  if (!fs.existsSync(path.join(registryDir, 'registry.interface.ts'))) throw new Error('Missing Registry interface');
  if (!fs.existsSync(path.join(registryDir, 'abstract.registry.ts'))) throw new Error('Missing Abstract Registry');
  if (!fs.existsSync(path.join(registryDir, 'worker.registry.ts'))) throw new Error('Missing Worker Registry');

  // Check unified event catalog
  if (!fs.existsSync(path.join(coreDir, 'events', 'event.catalog.ts'))) throw new Error('Missing Event Catalog');

  // Check health framework
  if (!fs.existsSync(path.join(coreDir, 'monitoring', 'health.contracts.ts'))) throw new Error('Missing Health Contracts');
  if (!fs.existsSync(path.join(coreDir, 'monitoring', 'health.aggregator.ts'))) throw new Error('Missing Health Aggregator');

  console.log('✅ Core Platform Extraction & Standardization Verified!');
}

verify();
