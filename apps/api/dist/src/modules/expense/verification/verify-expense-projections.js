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
    const readModelVersionPath = path.join(expenseDir, 'interfaces', 'projections', 'read-model-version.interface.ts');
    if (!fs.existsSync(readModelVersionPath))
        throw new Error('Missing ReadModelVersion interface');
    const budgetProjPath = path.join(expenseDir, 'interfaces', 'projections', 'budget.projection.ts');
    const budgetProjContent = fs.readFileSync(budgetProjPath, 'utf8');
    if (!budgetProjContent.includes('extends ReadModelVersion')) {
        throw new Error('BudgetProjection does not extend ReadModelVersion');
    }
    const projHandlerPath = path.join(expenseDir, 'interfaces', 'projections', 'projection-handler.interface.ts');
    if (!fs.existsSync(projHandlerPath))
        throw new Error('Missing ProjectionHandler interface');
    const registryPath = path.join(expenseDir, 'projections', 'registry', 'projection.registry.ts');
    if (!fs.existsSync(registryPath))
        throw new Error('Missing ProjectionRegistry');
    const metadataPath = path.join(expenseDir, 'projections', 'services', 'projection-metadata.service.ts');
    if (!fs.existsSync(metadataPath))
        throw new Error('Missing ProjectionMetadataService');
    const servicesDir = path.join(expenseDir, 'projections', 'services');
    const expectedServices = [
        'expense-projection.service.ts',
        'travel-projection.service.ts',
        'budget-projection.service.ts',
        'risk-projection.service.ts',
        'approval-projection.service.ts'
    ];
    for (const s of expectedServices) {
        if (!fs.existsSync(path.join(servicesDir, s)))
            throw new Error(`Missing service: ${s}`);
    }
    const workerPath = path.join(expenseDir, 'projections', 'workers', 'projection.worker.ts');
    if (!fs.existsSync(workerPath))
        throw new Error('Missing ProjectionWorker');
    const enginePath = path.join(expenseDir, 'projections', 'engine', 'projection-replay.engine.ts');
    if (!fs.existsSync(enginePath))
        throw new Error('Missing ProjectionReplayEngine');
    const healthPath = path.join(expenseDir, 'projections', 'health', 'projection-health.service.ts');
    if (!fs.existsSync(healthPath))
        throw new Error('Missing ProjectionHealthService');
    console.log('✅ Expense Projection Infrastructure Verification Passed!');
}
verify();
//# sourceMappingURL=verify-expense-projections.js.map