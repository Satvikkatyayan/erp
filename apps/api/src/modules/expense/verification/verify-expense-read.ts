import * as fs from 'fs';
import * as path from 'path';

function verify() {
  const expenseDir = path.join(__dirname, '..');
  
  // 1. Check queries folder
  const queriesDir = path.join(expenseDir, 'queries');
  const requiredQueries = [
    'expense-query.service.ts',
    'travel-query.service.ts',
    'budget-query.service.ts',
    'corporate-card-query.service.ts'
  ];
  
  for (const q of requiredQueries) {
    if (!fs.existsSync(path.join(queriesDir, q))) {
      throw new Error(`Missing query service: ${q}`);
    }
  }

  // 2. Check facade
  const facadePath = path.join(expenseDir, 'facades', 'expense-read.facade.ts');
  if (!fs.existsSync(facadePath)) {
    throw new Error('Missing ExpenseReadFacade');
  }

  // 3. Check DTOs
  const dtoDir = path.join(expenseDir, 'dto', 'query');
  if (!fs.existsSync(dtoDir)) {
      throw new Error('Missing DTO directory');
  }

  // 4. Check Projections (Now in Core)
  const projDir = path.join(expenseDir, '..', '..', 'core', 'cqrs');
  if (!fs.existsSync(projDir)) {
      throw new Error('Missing CQRS directory in Core');
  }

  console.log('✅ Expense Read CQRS Verification Passed!');
}

verify();
