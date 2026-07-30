const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

// ==========================================
// ENTERPRISE INTEGRATION PLATFORM
// ==========================================

model IntegrationProvider {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  connectorId     String   // REST, WEBHOOK, SFTP
  capabilities    Json     // auth methods, streaming, retry
  
  @@map("integration_providers")
}

model IntegrationConnectionProfile {
  id              String   @id @default(uuid()) @db.Uuid
  providerId      String   @db.Uuid
  organizationId  String?  @db.Uuid
  name            String
  
  config          Json     // Base URL, specific headers
  secretId        String?  // Reference to IntegrationSecret
  
  status          String   @default("ACTIVE")
  
  @@map("integration_connection_profiles")
}

model IntegrationSecret {
  id              String   @id @default(uuid()) @db.Uuid
  secretType      String   // OAUTH2, API_KEY, BASIC
  providerKey     String   // Where is this stored? (DATABASE, VAULT, AWS_KMS)
  
  encryptedData   String   // The actual secret blob
  
  @@map("integration_secrets")
}

model IntegrationEventCatalog {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique // EmployeeCreated
  schemaVersion   String   // v1.0
  schema          Json     // Required / Optional fields
  
  @@map("integration_events")
}

model IntegrationMapping {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  
  versions        IntegrationMappingVersion[]
  
  @@map("integration_mappings")
}

model IntegrationMappingVersion {
  id              String   @id @default(uuid()) @db.Uuid
  mappingId       String   @db.Uuid
  version         Int
  status          String   @default("DRAFT")
  
  definition      Json     // The AST / DSL mapping configuration
  
  mapping         IntegrationMapping @relation(fields: [mappingId], references: [id], onDelete: Cascade)
  
  @@unique([mappingId, version])
  @@map("integration_mapping_versions")
}

model IntegrationWebhook {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  url             String
  
  signatureHeader String?
  secretId        String?
  
  @@map("integration_webhooks")
}

model IntegrationRetryDLQ {
  id              String   @id @default(uuid()) @db.Uuid
  connectionId    String   @db.Uuid
  
  payload         Json
  errorContext    Json
  
  retryCount      Int      @default(0)
  nextRetryAt     DateTime?
  status          String   @default("PENDING") // PENDING, DEAD, RESOLVED
  
  createdAt       DateTime @default(now())
  
  @@map("integration_dlq")
}

model IntegrationAudit {
  id              String   @id @default(uuid()) @db.Uuid
  connectionId    String   @db.Uuid
  correlationId   String
  
  requestPayload  Json?
  responsePayload Json?
  
  latencyMs       Int
  statusCode      Int?
  
  executedAt      DateTime @default(now())
  
  @@map("integration_audit")
}

`;

if (!schema.includes('model IntegrationProvider {')) {
  schema += newModels;
  fs.writeFileSync(schemaPath, schema);
  console.log('Integration schemas appended successfully.');
} else {
  console.log('Integration schemas already exist.');
}
