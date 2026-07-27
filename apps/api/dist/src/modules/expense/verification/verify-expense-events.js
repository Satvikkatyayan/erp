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
    const coreEventsDir = path.join(expenseDir, '..', '..', 'core', 'events');
    if (!fs.existsSync(path.join(coreEventsDir, 'event.contracts.ts'))) {
        throw new Error('Missing event.contracts.ts in core/events');
    }
    const eventsDir = path.join(expenseDir, 'events');
    if (!fs.existsSync(path.join(eventsDir, 'expense-event.bus.ts'))) {
        throw new Error('Missing expense-event.bus.ts');
    }
    const coreRegistryDir = path.join(expenseDir, '..', '..', 'core', 'registry');
    if (!fs.existsSync(path.join(coreRegistryDir, 'event.registry.ts'))) {
        throw new Error('Missing event.registry.ts in core');
    }
    if (!fs.existsSync(path.join(eventsDir, 'idempotency', 'processed-event.store.ts'))) {
        throw new Error('Missing processed-event.store.ts');
    }
    const handlersDir = path.join(eventsDir, 'handlers');
    const handlers = ['expense.handlers.ts', 'travel.handlers.ts', 'misc.handlers.ts'];
    for (const h of handlers) {
        if (!fs.existsSync(path.join(handlersDir, h))) {
            throw new Error(`Missing handler file: ${h}`);
        }
    }
    const facadeContent = fs.readFileSync(path.join(expenseDir, 'facades', 'expense.facade.ts'), 'utf8');
    if (!facadeContent.includes('ExpenseEventBus') || !facadeContent.includes('this.eventBus.publish')) {
        throw new Error('ExpenseFacade does not integrate ExpenseEventBus');
    }
    console.log('✅ Expense Event Bus & Domain Integration Verification Passed!');
}
verify();
//# sourceMappingURL=verify-expense-events.js.map