const fs = require('fs');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf-8');

// Inject dataScopes relation into Role
if (!schema.includes('dataScopes RoleDataScope[]')) {
    schema = schema.replace(
        /permissions RolePermission\[\]/,
        'permissions RolePermission[]\n  dataScopes  RoleDataScope[]'
    );
}

// Inject trustedDevices relation into User
if (!schema.includes('trustedDevices TrustedDevice[]')) {
    schema = schema.replace(
        /auditLogs       AuditLog\[\]/,
        'auditLogs       AuditLog[]\n  trustedDevices  TrustedDevice[]'
    );
}

const NEW_MODELS = `

// ==========================================
// IAM & ENTERPRISE SECURITY DOMAIN (PHASE 3)
// ==========================================

model Module {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  name        String @unique
  description String?

  features Feature[]

  @@map("modules")
}

model Feature {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  moduleId String @db.Uuid
  name     String
  key      String @unique // e.g. 'leave.request'

  module Module @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  featureFlags FeatureFlag[]

  @@map("features")
}

model FeatureFlag {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  featureId      String @db.Uuid
  isEnabled      Boolean @default(true)
  
  organizationId String? @db.Uuid
  roleId         String? @db.Uuid
  userId         String? @db.Uuid

  feature Feature @relation(fields: [featureId], references: [id], onDelete: Cascade)

  @@map("feature_flags")
}

model Policy {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  name        String @unique
  description String?
  effect      String // ALLOW, DENY

  rules PolicyRule[]

  @@map("policies")
}

model PolicyRule {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  policyId  String @db.Uuid
  field     String 
  operator  String // EQUALS, IN, GREATER_THAN, etc
  value     String 
  
  policy Policy @relation(fields: [policyId], references: [id], onDelete: Cascade)

  @@map("policy_rules")
}

model RoleDataScope {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  roleId   String @db.Uuid
  module   String 
  scope    String 
  
  role Role @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@map("role_data_scopes")
}

model ApprovalMatrix {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  name        String
  entityType  String 
  
  levels ApprovalLevel[]

  @@map("approval_matrices")
}

model ApprovalLevel {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  matrixId    String @db.Uuid
  level       Int    
  approverType String // ROLE, MANAGER, SPECIFIC_USER, DEPARTMENT_HEAD
  approverId   String? 
  
  matrix ApprovalMatrix @relation(fields: [matrixId], references: [id], onDelete: Cascade)
  rules  ApprovalRule[]

  @@map("approval_levels")
}

model ApprovalRule {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  levelId  String @db.Uuid
  field    String
  operator String
  value    String
  
  level ApprovalLevel @relation(fields: [levelId], references: [id], onDelete: Cascade)

  @@map("approval_rules")
}

model SecurityEvent {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  userId    String? @db.Uuid
  eventType String // LOGIN_FAILED, POLICY_DENIED
  ipAddress String?
  userAgent String?
  details   Json?

  @@map("security_events")
}

model Activity {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  userId     String? @db.Uuid
  entityType String
  entityId   String
  action     String // CREATED, UPDATED
  metadata   Json?

  @@index([entityType, entityId])
  @@map("activities")
}

model TrustedDevice {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)

  userId       String @db.Uuid
  deviceFingerprint String
  deviceName   String?
  lastUsedAt   DateTime
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("trusted_devices")
}
`;

if (!schema.includes('model SecurityEvent')) {
    schema += NEW_MODELS;
}

fs.writeFileSync(schemaPath, schema);
console.log('Appended IAM tables to schema.');
