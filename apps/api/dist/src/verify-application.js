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
const child_process = __importStar(require("child_process"));
const path = __importStar(require("path"));
function runScript(scriptPath) {
    return new Promise((resolve, reject) => {
        console.log(`\n===========================================`);
        console.log(`Running: ${scriptPath}`);
        console.log(`===========================================`);
        const process = child_process.spawn('npx', ['ts-node', scriptPath], {
            stdio: 'inherit',
            shell: true
        });
        process.on('close', (code) => {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error(`Script ${scriptPath} failed with exit code ${code}`));
            }
        });
    });
}
async function verifyAll() {
    try {
        const scriptsDir = path.join(__dirname, 'modules', 'expense', 'verification');
        await runScript(path.join(scriptsDir, 'verify-core-platform.ts'));
        await runScript(path.join(scriptsDir, 'verify-expense-module.ts'));
        console.log('\n✅ All modules integrate correctly.');
        console.log('✅ Entire ERP boots and architecture is sound.');
        console.log('\n🌍 SYSTEM IS READY FOR DEPLOYMENT 🌍');
    }
    catch (error) {
        console.error('\n❌ Verification Failed:', error);
        process.exit(1);
    }
}
verifyAll();
//# sourceMappingURL=verify-application.js.map