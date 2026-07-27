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
    const controllersDir = path.join(expenseDir, 'controllers');
    const commandControllers = [
        'expense-claim.controller.ts',
        'travel.controller.ts',
        'manager-approval.controller.ts',
        'expense-admin.controller.ts',
        'corporate-card.controller.ts'
    ];
    for (const c of commandControllers) {
        if (!fs.existsSync(path.join(controllersDir, c)))
            throw new Error(`Missing command controller: ${c}`);
    }
    const queryControllers = [
        'expense-query.controller.ts',
        'travel-query.controller.ts',
        'budget-query.controller.ts',
        'corporate-card-query.controller.ts',
        'manager-dashboard.controller.ts'
    ];
    for (const c of queryControllers) {
        if (!fs.existsSync(path.join(controllersDir, c)))
            throw new Error(`Missing query controller: ${c}`);
    }
    const requestDtoDir = path.join(expenseDir, 'dto', 'requests');
    const requestDtos = ['expense-claim.dto.ts', 'travel.dto.ts', 'manager-approval.dto.ts', 'corporate-card.dto.ts'];
    for (const c of requestDtos) {
        if (!fs.existsSync(path.join(requestDtoDir, c)))
            throw new Error(`Missing request dto: ${c}`);
    }
    const responseDtoDir = path.join(expenseDir, 'dto', 'responses');
    if (!fs.existsSync(path.join(responseDtoDir, 'standard.response.ts')))
        throw new Error(`Missing response dto`);
    const mappersDir = path.join(expenseDir, 'mappers');
    const mappers = ['expense-command.mapper.ts', 'expense-query.mapper.ts', 'travel.mapper.ts', 'corporate-card.mapper.ts'];
    for (const c of mappers) {
        if (!fs.existsSync(path.join(mappersDir, c)))
            throw new Error(`Missing mapper: ${c}`);
    }
    const decoratorsDir = path.join(expenseDir, 'decorators');
    if (!fs.existsSync(path.join(decoratorsDir, 'roles.decorator.ts')))
        throw new Error(`Missing Auth decorator`);
    const controllerContent = fs.readFileSync(path.join(controllersDir, 'expense-claim.controller.ts'), 'utf8');
    if (!controllerContent.includes('@ApiTags') || !controllerContent.includes('@ApiOperation')) {
        throw new Error('Missing Swagger annotations');
    }
    const commandContent = fs.readFileSync(path.join(controllersDir, 'expense-claim.controller.ts'), 'utf8');
    if (commandContent.includes('ExpenseReadFacade'))
        throw new Error('CQRS Violation: Command Controller uses ReadFacade');
    if (!commandContent.includes('ExpenseFacade'))
        throw new Error('CQRS Violation: Command Controller missing WriteFacade');
    const queryContent = fs.readFileSync(path.join(controllersDir, 'expense-query.controller.ts'), 'utf8');
    if (queryContent.includes(' ExpenseFacade'))
        throw new Error('CQRS Violation: Query Controller uses WriteFacade');
    if (!queryContent.includes('ExpenseReadFacade'))
        throw new Error('CQRS Violation: Query Controller missing ReadFacade');
    console.log('✅ Expense API Surface Verification Passed!');
}
verify();
//# sourceMappingURL=verify-expense-api.js.map