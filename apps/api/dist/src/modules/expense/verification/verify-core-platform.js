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
    const coreDir = path.join(__dirname, '..', '..', '..', 'core');
    const sdkFile = path.join(coreDir, 'sdk', 'index.ts');
    if (!fs.existsSync(sdkFile))
        throw new Error('Missing SDK package');
    const sdkContent = fs.readFileSync(sdkFile, 'utf8');
    if (!sdkContent.includes('execution/interfaces'))
        throw new Error('SDK missing Execution');
    if (!sdkContent.includes('cqrs/cqrs.contracts'))
        throw new Error('SDK missing CQRS');
    if (!sdkContent.includes('registry/registry.interface'))
        throw new Error('SDK missing Registry');
    if (!sdkContent.includes('events/event.catalog'))
        throw new Error('SDK missing Event Catalog');
    if (!sdkContent.includes('monitoring/health.contracts'))
        throw new Error('SDK missing Monitoring');
    if (!fs.existsSync(path.join(coreDir, 'cqrs', 'cqrs.contracts.ts')))
        throw new Error('Missing CQRS contracts');
    const registryDir = path.join(coreDir, 'registry');
    if (!fs.existsSync(path.join(registryDir, 'registry.interface.ts')))
        throw new Error('Missing Registry interface');
    if (!fs.existsSync(path.join(registryDir, 'abstract.registry.ts')))
        throw new Error('Missing Abstract Registry');
    if (!fs.existsSync(path.join(registryDir, 'worker.registry.ts')))
        throw new Error('Missing Worker Registry');
    if (!fs.existsSync(path.join(coreDir, 'events', 'event.catalog.ts')))
        throw new Error('Missing Event Catalog');
    if (!fs.existsSync(path.join(coreDir, 'monitoring', 'health.contracts.ts')))
        throw new Error('Missing Health Contracts');
    if (!fs.existsSync(path.join(coreDir, 'monitoring', 'health.aggregator.ts')))
        throw new Error('Missing Health Aggregator');
    console.log('✅ Core Platform Extraction & Standardization Verified!');
}
verify();
//# sourceMappingURL=verify-core-platform.js.map