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
    const scriptsDir = path.join(__dirname);
    const scripts = [
      'verify-expense-read.ts',
      'verify-expense-workers.ts',
      'verify-expense-api.ts',
      'verify-expense-events.ts'
    ];

    for (const script of scripts) {
      await runScript(path.join(scriptsDir, script));
    }

    console.log('\n✅ All verification scripts passed successfully!');
    console.log('✅ End-to-end architecture verified.');
    console.log('✅ Context propagation verified.');
    console.log('✅ DTOs, API layers, and CQRS separation verified.');
    console.log('✅ Event bus and handlers verified.');
    
    console.log('\n🚀 EXPENSE MODULE IS READY FOR PRODUCTION INTEGRATION 🚀');

  } catch (error) {
    console.error('\n❌ Verification Failed:', error);
    process.exit(1);
  }
}

verifyAll();
