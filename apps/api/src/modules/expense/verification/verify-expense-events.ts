import * as fs from 'fs';
import * as path from 'path';

function verify() {
  const expenseDir = path.join(__dirname, '..');

  // 1. Check Event Contracts
  const coreEventsDir = path.join(expenseDir, '..', '..', 'core', 'events');
  if (!fs.existsSync(path.join(coreEventsDir, 'event.contracts.ts'))) {
    throw new Error('Missing event.contracts.ts in core/events');
  }

  // 2. Check Event Bus
  const eventsDir = path.join(expenseDir, 'events');
  if (!fs.existsSync(path.join(eventsDir, 'expense-event.bus.ts'))) {
    throw new Error('Missing expense-event.bus.ts');
  }

  // 3. Check Event Registry (Now in Core)
  const coreRegistryDir = path.join(expenseDir, '..', '..', 'core', 'registry');
  if (!fs.existsSync(path.join(coreRegistryDir, 'event.registry.ts'))) {
    throw new Error('Missing event.registry.ts in core');
  }

  // 4. Check Idempotency
  if (!fs.existsSync(path.join(eventsDir, 'idempotency', 'processed-event.store.ts'))) {
    throw new Error('Missing processed-event.store.ts');
  }

  // 5. Check Event Handlers
  const handlersDir = path.join(eventsDir, 'handlers');
  const handlers = ['expense.handlers.ts', 'travel.handlers.ts', 'misc.handlers.ts'];
  for (const h of handlers) {
    if (!fs.existsSync(path.join(handlersDir, h))) {
      throw new Error(`Missing handler file: ${h}`);
    }
  }
  
  // 6. Check Publisher Integration
  const facadeContent = fs.readFileSync(path.join(expenseDir, 'facades', 'expense.facade.ts'), 'utf8');
  if (!facadeContent.includes('ExpenseEventBus') || !facadeContent.includes('this.eventBus.publish')) {
    throw new Error('ExpenseFacade does not integrate ExpenseEventBus');
  }

  console.log('✅ Expense Event Bus & Domain Integration Verification Passed!');
}

verify();
