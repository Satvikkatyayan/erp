const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

// We need to inject fields into WorkflowState and WorkflowTransition
const stateInjection = `
  onEnterHooks Json? 
  onExitHooks  Json?
`;
if (!schema.includes('onEnterHooks')) {
  schema = schema.replace(
    /(model WorkflowState \{[^}]*type\s+String[^\n]*\n)/,
    "$1" + stateInjection
  );
}

const transitionInjection = `
  validators   Json? 
  beforeActions Json? 
  afterActions  Json?
  compensation  Json? 
`;
if (!schema.includes('validators')) {
  schema = schema.replace(
    /(model WorkflowTransition \{[^}]*name\s+String[^\n]*\n)/,
    "$1" + transitionInjection
  );
}

// Append new models
const newModels = `
model WorkflowVariable {
  id         String   @id @default(uuid()) @db.Uuid
  instanceId String   @db.Uuid
  key        String
  type       String   // String, Number, Boolean, Date, JSON, Computed
  value      String?  // Serialized value
  expression String?  // e.g. endDate - startDate
  
  instance   WorkflowInstance @relation(fields: [instanceId], references: [id], onDelete: Cascade)

  @@unique([instanceId, key])
  @@map("workflow_variables")
}

model WorkflowSnapshot {
  id           String   @id @default(uuid()) @db.Uuid
  createdAt    DateTime @default(now())
  
  instanceId   String   @db.Uuid
  transitionId String?  @db.Uuid
  stateId      String   @db.Uuid
  
  variables    Json
  assignees    Json?
  snapshotData Json
  
  instance     WorkflowInstance @relation(fields: [instanceId], references: [id], onDelete: Cascade)

  @@map("workflow_snapshots")
}

model WorkflowMetrics {
  id             String   @id @default(uuid()) @db.Uuid
  updatedAt      DateTime @updatedAt
  
  definitionId   String   @db.Uuid
  averageTimeMs  BigInt   @default(0)
  totalInstances Int      @default(0)
  completedCount Int      @default(0)
  rejectedCount  Int      @default(0)
  cancelledCount Int      @default(0)
  slaBreachCount Int      @default(0)
  
  definition     WorkflowDefinition @relation(fields: [definitionId], references: [id], onDelete: Cascade)

  @@unique([definitionId])
  @@map("workflow_metrics")
}
`;

if (!schema.includes('model WorkflowVariable')) {
  schema += newModels;
}

// Ensure instances can have variables and snapshots
if (!schema.includes('variables WorkflowVariable[]')) {
  schema = schema.replace(
    /(model WorkflowInstance \{[^}]*tasks WorkflowTask\[\]\n)/,
    "$1  variables WorkflowVariable[]\n  snapshots WorkflowSnapshot[]\n"
  );
}

// Ensure definition can have metrics
if (!schema.includes('metrics WorkflowMetrics?')) {
  schema = schema.replace(
    /(model WorkflowDefinition \{[^}]*versions WorkflowVersion\[\]\n)/,
    "$1  metrics WorkflowMetrics?\n"
  );
}

fs.writeFileSync(schemaPath, schema);
console.log('Workflow schema enhanced successfully.');
