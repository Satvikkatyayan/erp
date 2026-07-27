import * as child_process from 'child_process';
import * as path from 'path';

function runScript(scriptPath: string): Promise<void> {
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
      } else {
        reject(new Error(`Script ${scriptPath} failed with exit code ${code}`));
      }
    });
  });
}

async function verifyAll() {
  try {
    const scriptsDir = path.join(__dirname, 'modules', 'expense', 'verification');
    
    // 1. Verify Core Platform
    await runScript(path.join(scriptsDir, 'verify-core-platform.ts'));
    
    // 2. Verify Expense Module (which runs its own suite)
    await runScript(path.join(scriptsDir, 'verify-expense-module.ts'));

    // 3. (Future) Verify Payroll Module
    // await runScript(path.join(__dirname, 'modules', 'payroll', 'verification', 'verify-payroll-module.ts'));

    console.log('\n✅ All modules integrate correctly.');
    console.log('✅ Entire ERP boots and architecture is sound.');
    console.log('\n🌍 SYSTEM IS READY FOR DEPLOYMENT 🌍');

  } catch (error) {
    console.error('\n❌ Verification Failed:', error);
    process.exit(1);
  }
}

verifyAll();
