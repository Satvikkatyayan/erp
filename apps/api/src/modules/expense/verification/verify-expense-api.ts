import * as fs from 'fs';
import * as path from 'path';

function verify() {
  const expenseDir = path.join(__dirname, '..');

  // 1. Check Controllers
  const controllersDir = path.join(expenseDir, 'controllers');
  const commandControllers = [
    'expense-claim.controller.ts',
    'travel.controller.ts',
    'manager-approval.controller.ts',
    'expense-admin.controller.ts',
    'corporate-card.controller.ts'
  ];
  for (const c of commandControllers) {
    if (!fs.existsSync(path.join(controllersDir, c))) throw new Error(`Missing command controller: ${c}`);
  }

  const queryControllers = [
    'expense-query.controller.ts',
    'travel-query.controller.ts',
    'budget-query.controller.ts',
    'corporate-card-query.controller.ts',
    'manager-dashboard.controller.ts'
  ];
  for (const c of queryControllers) {
    if (!fs.existsSync(path.join(controllersDir, c))) throw new Error(`Missing query controller: ${c}`);
  }

  // 2. Check Request DTOs
  const requestDtoDir = path.join(expenseDir, 'dto', 'requests');
  const requestDtos = ['expense-claim.dto.ts', 'travel.dto.ts', 'manager-approval.dto.ts', 'corporate-card.dto.ts'];
  for (const c of requestDtos) {
    if (!fs.existsSync(path.join(requestDtoDir, c))) throw new Error(`Missing request dto: ${c}`);
  }

  // 3. Check Response DTOs
  const responseDtoDir = path.join(expenseDir, 'dto', 'responses');
  if (!fs.existsSync(path.join(responseDtoDir, 'standard.response.ts'))) throw new Error(`Missing response dto`);

  // 4. Check Mappers
  const mappersDir = path.join(expenseDir, 'mappers');
  const mappers = ['expense-command.mapper.ts', 'expense-query.mapper.ts', 'travel.mapper.ts', 'corporate-card.mapper.ts'];
  for (const c of mappers) {
    if (!fs.existsSync(path.join(mappersDir, c))) throw new Error(`Missing mapper: ${c}`);
  }

  // 5. Check Authorization Decorators
  const decoratorsDir = path.join(expenseDir, 'decorators');
  if (!fs.existsSync(path.join(decoratorsDir, 'roles.decorator.ts'))) throw new Error(`Missing Auth decorator`);

  // 6. Check Swagger Annotations
  const controllerContent = fs.readFileSync(path.join(controllersDir, 'expense-claim.controller.ts'), 'utf8');
  if (!controllerContent.includes('@ApiTags') || !controllerContent.includes('@ApiOperation')) {
    throw new Error('Missing Swagger annotations');
  }

  // 7. Check CQRS separation
  const commandContent = fs.readFileSync(path.join(controllersDir, 'expense-claim.controller.ts'), 'utf8');
  if (commandContent.includes('ExpenseReadFacade')) throw new Error('CQRS Violation: Command Controller uses ReadFacade');
  if (!commandContent.includes('ExpenseFacade')) throw new Error('CQRS Violation: Command Controller missing WriteFacade');

  const queryContent = fs.readFileSync(path.join(controllersDir, 'expense-query.controller.ts'), 'utf8');
  if (queryContent.includes(' ExpenseFacade')) throw new Error('CQRS Violation: Query Controller uses WriteFacade');
  if (!queryContent.includes('ExpenseReadFacade')) throw new Error('CQRS Violation: Query Controller missing ReadFacade');

  console.log('✅ Expense API Surface Verification Passed!');
}

verify();
