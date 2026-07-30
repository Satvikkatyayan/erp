const fs = require('fs');
const path = require('path');

const CORE_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core';

const modules = [
    'search',
    'storage',
    'scheduler',
    'templates',
    'rules',
    'integration',
    'forms',
    'reports',
    'ai',
    'workflow',
    'calendar'
];

// Append new modules to core.module.ts
const coreModulePath = path.join(CORE_DIR, 'core.module.ts');
let coreModule = fs.readFileSync(coreModulePath, 'utf-8');

modules.forEach(m => {
    const className = toCamelCase(m, true) + 'Module';
    if (!coreModule.includes(className)) {
        // Insert import
        coreModule = coreModule.replace(
            /(@Global\(\))/g,
            `import { ${className} } from './${m}/${m}.module';\n$1`
        );
        // Insert into imports array
        coreModule = coreModule.replace(
            /(imports:\s*\[)/,
            `$1\n    ${className},`
        );
        // Insert into exports array
        coreModule = coreModule.replace(
            /(exports:\s*\[)/,
            `$1\n    ${className},`
        );
    }
});

fs.writeFileSync(coreModulePath, coreModule);

// Generate submodules
modules.forEach(mod => {
    const modDir = path.join(CORE_DIR, mod);
    if (!fs.existsSync(modDir)) {
        fs.mkdirSync(modDir, { recursive: true });
    }

    const className = toCamelCase(mod, true) + 'Module';
    const code = `import { Module } from '@nestjs/common';

@Module({
  providers: [],
  exports: [],
})
export class ${className} {}
`;
    const moduleFilePath = path.join(modDir, `${mod}.module.ts`);
    if (!fs.existsSync(moduleFilePath)) {
        fs.writeFileSync(moduleFilePath, code);
    }
});

function toCamelCase(str, capitalizeFirst) {
    const parts = str.split('-');
    const camel = parts.map((part, index) => {
        if (index === 0 && !capitalizeFirst) return part;
        return part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');
    return camel;
}

console.log('Core engines scaffolded successfully.');
