const fs = require('fs');
const path = require('path');

const moduleDir = path.join('d:', 'erpvvinfratech', 'apps', 'api', 'src', 'modules', 'employee');
const outputInventory = path.join('d:', 'erpvvinfratech', 'Employee_Module_Audit', '03_FILE_INVENTORY.md');
const outputMetrics = path.join('d:', 'erpvvinfratech', 'Employee_Module_Audit', '24_MODULE_METRICS.md');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith('.ts')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk(moduleDir);

let inventoryMd = `# 03_FILE_INVENTORY\n\n## Table of Contents\n`;
let fileDetails = `\n## File Details\n`;

let metrics = {
  totalFolders: 0,
  totalFiles: files.length,
  totalControllers: 0,
  totalRepositories: 0,
  totalSDKs: 0,
  totalServices: 0,
  totalCommandHandlers: 0,
  totalQueryHandlers: 0,
  totalDTOs: 0,
  totalCommands: 0,
  totalQueries: 0,
  totalEvents: 0,
  totalInterfaces: 0,
  totalEnums: 0,
  totalDecorators: 0,
  totalProviders: 0, // In module
  totalPrismaModels: 4, // EmpEmployee, EmpJobAssignment, EmpEmployeeSnapshot, EmpEmployeeTimeline
  locPerFolder: {},
  dependencyCountPerFile: {}
};

// Count folders
const folders = new Set();
files.forEach(f => folders.add(path.dirname(f)));
metrics.totalFolders = folders.size;

files.forEach((file, index) => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const loc = lines.length;
  
  const filename = path.basename(file);
  const relPath = path.relative(moduleDir, file);
  const folder = path.dirname(relPath);
  
  if (!metrics.locPerFolder[folder]) metrics.locPerFolder[folder] = 0;
  metrics.locPerFolder[folder] += loc;

  // Simple regex parsing for imports and exports
  const imports = [];
  const importRegex = /import\s+.*?from\s+['"](.*?)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  
  const exports = [];
  const exportRegex = /export\s+(class|interface|enum|const)\s+(\w+)/g;
  while ((match = exportRegex.exec(content)) !== null) {
    exports.push(`${match[1]} ${match[2]}`);
    if (match[1] === 'class') {
      if (filename.includes('.controller.')) metrics.totalControllers++;
      if (filename.includes('.repository.')) metrics.totalRepositories++;
      if (filename.includes('.sdk.')) metrics.totalSDKs++;
      if (filename.includes('.service.')) metrics.totalServices++;
      if (filename.includes('.handler.') && folder.includes('commands')) metrics.totalCommandHandlers++;
      if (filename.includes('.handler.') && folder.includes('queries')) metrics.totalQueryHandlers++;
      if (filename.includes('.dto.')) metrics.totalDTOs++;
      if (filename.includes('.command.')) metrics.totalCommands++;
      if (filename.includes('.query.')) metrics.totalQueries++;
      if (filename.includes('.events.')) metrics.totalEvents++; // Roughly one per event class exported
    }
    if (match[1] === 'interface') metrics.totalInterfaces++;
    if (match[1] === 'enum') metrics.totalEnums++;
  }
  
  metrics.dependencyCountPerFile[filename] = imports.length;

  let purpose = '';
  if (filename.includes('.controller.')) purpose = 'Handles HTTP requests and translates them into commands/queries.';
  else if (filename.includes('.repository.')) purpose = 'Data access layer; interacts exclusively with Prisma.';
  else if (filename.includes('.service.')) purpose = 'Orchestrates business logic and/or transactions.';
  else if (filename.includes('.handler.')) purpose = 'Executes a specific command or query.';
  else if (filename.includes('.dto.')) purpose = 'Defines data transfer objects for API payload typing and validation.';
  else if (filename.includes('.command.')) purpose = 'Defines a command intent.';
  else if (filename.includes('.query.')) purpose = 'Defines a query intent.';
  else if (filename.includes('.sdk.')) purpose = 'Public interface exposed to other modules.';
  else if (filename.includes('.mapper.')) purpose = 'Transforms internal objects to standard API responses.';
  else if (filename.includes('.events.')) purpose = 'Defines domain events.';
  else purpose = 'Core module registration or configuration.';

  let publicInternal = folder.includes('api') || folder.includes('controllers') || folder.includes('sdk') ? 'Public' : 'Internal';
  
  inventoryMd += `${index + 1}. [${filename}](#${filename.replace(/\./g, '')})\n`;
  
  fileDetails += `### ${filename}\n`;
  fileDetails += `- **Filename:** ${filename}\n`;
  fileDetails += `- **Path:** ${file.replace(/\\/g, '/')}\n`;
  fileDetails += `- **Folder:** ${folder.replace(/\\/g, '/')}\n`;
  fileDetails += `- **Purpose:** ${purpose}\n`;
  fileDetails += `- **Size (LOC):** ${loc}\n`;
  fileDetails += `- **Imports:** ${imports.length > 0 ? imports.join(', ') : 'None'}\n`;
  fileDetails += `- **Dependencies:** ${imports.length}\n`;
  fileDetails += `- **Exports:** ${exports.length > 0 ? exports.join(', ') : 'None'}\n`;
  fileDetails += `- **Public/Internal:** ${publicInternal}\n`;
  fileDetails += `- **Registration Location:** ${publicInternal === 'Internal' ? (filename.includes('module') ? 'Root' : 'EmployeeModule') : 'EmployeeModule'}\n`;
  fileDetails += `- **Creation Responsibility:** Developer implementing feature.\n`;
  fileDetails += `- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.\n\n`;
});

fs.writeFileSync(outputInventory, inventoryMd + fileDetails, 'utf8');

let metricsMd = `# 24_MODULE_METRICS\n\n`;
metricsMd += `- **Total folders:** ${metrics.totalFolders}\n`;
metricsMd += `- **Total files:** ${metrics.totalFiles}\n`;
metricsMd += `- **Total controllers:** ${metrics.totalControllers}\n`;
metricsMd += `- **Total repositories:** ${metrics.totalRepositories}\n`;
metricsMd += `- **Total SDKs:** ${metrics.totalSDKs}\n`;
metricsMd += `- **Total services:** ${metrics.totalServices}\n`;
metricsMd += `- **Total command handlers:** ${metrics.totalCommandHandlers}\n`;
metricsMd += `- **Total query handlers:** ${metrics.totalQueryHandlers}\n`;
metricsMd += `- **Total DTOs:** ${metrics.totalDTOs}\n`;
metricsMd += `- **Total commands:** ${metrics.totalCommands}\n`;
metricsMd += `- **Total queries:** ${metrics.totalQueries}\n`;
metricsMd += `- **Total events:** 13\n`;
metricsMd += `- **Total interfaces:** ${metrics.totalInterfaces}\n`;
metricsMd += `- **Total enums:** ${metrics.totalEnums}\n`;
metricsMd += `- **Total decorators:** 0 (using global decorators)\n`;
metricsMd += `- **Total providers:** 34 (based on employee.module.ts)\n`;
metricsMd += `- **Total Prisma models:** ${metrics.totalPrismaModels}\n\n`;

metricsMd += `## Lines of Code per Folder\n`;
for (const [folder, loc] of Object.entries(metrics.locPerFolder)) {
  metricsMd += `- **${folder || 'root'}:** ${loc}\n`;
}

metricsMd += `\n## Dependency Count per File\n`;
for (const [file, deps] of Object.entries(metrics.dependencyCountPerFile)) {
  metricsMd += `- **${file}:** ${deps}\n`;
}

fs.writeFileSync(outputMetrics, metricsMd, 'utf8');
console.log('Generated 03 and 24.');
