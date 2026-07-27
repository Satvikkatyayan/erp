const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

// Append optimistic locking version to WorkflowTask
const taskInjection = `
  version     Int      @default(1)
`;
if (!schema.includes('version     Int      @default(1)')) {
  schema = schema.replace(
    /(model WorkflowTask \{[^}]*status\s+String[^\n]*\n)/,
    "$1" + taskInjection
  );
}

// Enhance WorkflowSnapshot
if (!schema.includes('ruleReferences Json?')) {
  const snapshotInjection = `
  ruleReferences        Json?
  assignmentStrategies  Json?
  slaConfiguration      Json?
  notificationConfig    Json?
`;
  schema = schema.replace(
    /(model WorkflowSnapshot \{[^}]*snapshotData\s+Json[^\n]*\n)/,
    "$1" + snapshotInjection
  );
}

fs.writeFileSync(schemaPath, schema);
console.log('Schema updated for optimistic locking and expanded snapshots.');
