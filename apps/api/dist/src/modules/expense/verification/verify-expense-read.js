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
    const facadePath = path.join(expenseDir, 'facades', 'expense-read.facade.ts');
    if (!fs.existsSync(facadePath)) {
        throw new Error('Missing ExpenseReadFacade');
    }
    const dtoDir = path.join(expenseDir, 'dto', 'query');
    if (!fs.existsSync(dtoDir)) {
        throw new Error('Missing DTO directory');
    }
    const projDir = path.join(expenseDir, '..', '..', 'core', 'cqrs');
    if (!fs.existsSync(projDir)) {
        throw new Error('Missing CQRS directory in Core');
    }
    console.log('✅ Expense Read CQRS Verification Passed!');
}
verify();
//# sourceMappingURL=verify-expense-read.js.map