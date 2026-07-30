const fs = require('fs');
const path = require('path');

const CORE_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core';

const modules = [
    'authentication',
    'authorization',
    'policy',
    'scope',
    'approval',
    'audit',
    'events',
    'feature-flags',
    'cache',
    'common'
];

// Ensure core directory exists
if (!fs.existsSync(CORE_DIR)) {
    fs.mkdirSync(CORE_DIR, { recursive: true });
}

// Generate the Core module
const coreModuleCode = `import { Global, Module } from '@nestjs/common';
${modules.map(m => `import { ${toCamelCase(m, true)}Module } from './${m}/${m}.module';`).join('\n')}

@Global()
@Module({
  imports: [
${modules.map(m => `    ${toCamelCase(m, true)}Module,`).join('\n')}
  ],
  exports: [
${modules.map(m => `    ${toCamelCase(m, true)}Module,`).join('\n')}
  ],
})
export class CoreModule {}
`;

fs.writeFileSync(path.join(CORE_DIR, 'core.module.ts'), coreModuleCode);

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
    fs.writeFileSync(path.join(modDir, `${mod}.module.ts`), code);
});

function toCamelCase(str, capitalizeFirst) {
    const parts = str.split('-');
    const camel = parts.map((part, index) => {
        if (index === 0 && !capitalizeFirst) return part;
        return part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');
    return camel;
}

console.log('Core module and submodules scaffolded successfully.');
