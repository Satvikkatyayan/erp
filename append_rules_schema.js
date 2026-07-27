const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

// ==========================================
// BUSINESS RULE ENGINE
// ==========================================

model RulePackage {
  id          String   @id @default(uuid()) @db.Uuid
  name        String   @unique
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  ruleSets    RuleSet[]

  @@map("rule_packages")
}

model RuleSet {
  id          String   @id @default(uuid()) @db.Uuid
  packageId   String   @db.Uuid
  name        String   @unique
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  package     RulePackage @relation(fields: [packageId], references: [id], onDelete: Cascade)
  versions    RuleVersion[]

  @@map("rule_sets")
}

model RuleVersion {
  id            String   @id @default(uuid()) @db.Uuid
  ruleSetId     String   @db.Uuid
  version       Int
  status        String   @default("DRAFT") // DRAFT, PUBLISHED, ARCHIVED
  priority      Int      @default(10)
  effectiveFrom DateTime?
  effectiveTo   DateTime?
  
  definition    Json     // AST, Nodes, Edges for Decision Graph
  hitPolicy     String   @default("FIRST_MATCH") // FIRST_MATCH, UNIQUE, COLLECT, ANY, PRIORITY
  variables     Json?    // Typed Variables Configuration
  dependencies  Json?    // Array of rule keys this version depends on
  
  ruleSet       RuleSet  @relation(fields: [ruleSetId], references: [id], onDelete: Cascade)
  executions    RuleExecution[]

  @@unique([ruleSetId, version])
  @@map("rule_versions")
}

model RuleExecution {
  id            String   @id @default(uuid()) @db.Uuid
  ruleVersionId String   @db.Uuid
  executedAt    DateTime @default(now())
  durationMs    Int
  
  inputPayload  Json
  outputPayload Json
  trace         Json     // The explainability tree
  wasCached     Boolean  @default(false)
  hasError      Boolean  @default(false)
  errorMessage  String?

  ruleVersion   RuleVersion @relation(fields: [ruleVersionId], references: [id], onDelete: Cascade)

  @@map("rule_executions")
}

model RuleTestCase {
  id            String   @id @default(uuid()) @db.Uuid
  ruleSetId     String   @db.Uuid
  name          String
  description   String?
  inputContext  Json
  expectedOutput Json
  
  @@map("rule_test_cases")
}

model RuleTemplate {
  id            String   @id @default(uuid()) @db.Uuid
  name          String   @unique
  description   String?
  schema        Json     // Reusable structural schema

  @@map("rule_templates")
}
`;

if (!schema.includes('model RuleSet')) {
  schema += newModels;
  fs.writeFileSync(schemaPath, schema);
  console.log('Rule Engine schemas appended successfully.');
} else {
  console.log('Rule Engine schemas already exist.');
}
