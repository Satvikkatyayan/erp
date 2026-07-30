const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

// ==========================================
// PHASE 5.1: ORGANIZATION MANAGEMENT MODULE
// ==========================================

model Tenant {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  
  status          String   @default("ACTIVE") // ACTIVE, SUSPENDED
  createdAt       DateTime @default(now())
  
  organizations   Organization[]
  
  @@map("core_tenants")
}

model Organization {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  
  code            String   @unique
  name            String
  legalName       String?
  registrationNo  String?
  taxId           String?
  
  industry        String?
  currencyCode    String?
  timezone        String?
  
  logoStorageId   String?  @db.Uuid // Ref to Storage Engine
  status          String   @default("ACTIVE") // ACTIVE, INACTIVE
  
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  tenant          Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  branches        Branch[]
  businessUnits   BusinessUnit[]
  settings        OrgSettingsSnapshot[]
  policies        OrgPolicyAssignment[]

  currencyId      String? @db.Uuid
  currency        Currency? @relation(fields: [currencyId], references: [id])
  holidays        Holiday[]
  employees       Employee[]
  shifts          Shift[]
  leaveTypes      LeaveType[]
  projects        Project[]
  
  @@map("org_organizations")
}

model Branch {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  organizationId  String   @db.Uuid
  
  code            String
  name            String
  address         Json?
  timezone        String?
  
  status          String   @default("ACTIVE")
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  cityId          String? @db.Uuid
  city            City? @relation(fields: [cityId], references: [id])
  employees       Employee[]
  
  @@unique([organizationId, code])
  @@map("org_branches")
}

model BusinessUnit {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  organizationId  String   @db.Uuid
  
  code            String
  name            String
  
  status          String   @default("ACTIVE")
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  divisions       Division[]
  
  @@unique([organizationId, code])
  @@map("org_business_units")
}

model Division {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  businessUnitId  String   @db.Uuid
  
  code            String
  name            String
  
  status          String   @default("ACTIVE")
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  businessUnit    BusinessUnit @relation(fields: [businessUnitId], references: [id], onDelete: Cascade)
  departments     Department[]
  
  @@map("org_divisions")
}

model Department {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  divisionId      String?  @db.Uuid
  parentId        String?  @db.Uuid
  
  code            String
  name            String
  managerId       String?  @db.Uuid // Reference to Employee eventually
  costCenterId    String?  @db.Uuid
  
  status          String   @default("ACTIVE")
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  division        Division? @relation(fields: [divisionId], references: [id])
  parent          Department? @relation("DepartmentHierarchy", fields: [parentId], references: [id])
  children        Department[] @relation("DepartmentHierarchy")
  teams           Team[]

  employees       Employee[]
  departmentTransfers DepartmentTransfer[]
  
  @@map("org_departments")
}

model Team {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  departmentId    String   @db.Uuid
  
  code            String
  name            String
  managerId       String?  @db.Uuid
  
  status          String   @default("ACTIVE")
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  department      Department @relation(fields: [departmentId], references: [id], onDelete: Cascade)
  
  @@map("org_teams")
}

model Designation {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  
  code            String   @unique
  name            String
  level           Int      @default(1)
  
  status          String   @default("ACTIVE")
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  @@map("org_designations")
}

model Grade {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  
  code            String   @unique
  name            String
  payBandRef      String?
  
  status          String   @default("ACTIVE")
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  @@map("org_grades")
}

model EmploymentType {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  
  code            String   @unique // PERMANENT, CONTRACT
  name            String
  
  status          String   @default("ACTIVE")
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  @@map("org_employment_types")
}

model OrgPolicyAssignment {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  organizationId  String   @db.Uuid
  
  policyType      String   // LEAVE, ATTENDANCE, PAYROLL
  policyRefId     String   @db.Uuid // Link to actual policy definition
  
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  
  @@map("org_policy_assignments")
}

model OrgSettingsSnapshot {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  organizationId  String   @db.Uuid
  
  version         Int
  payload         Json     // dateFormat, timeFormat, weekendRules, defaultLanguage
  
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  
  @@unique([organizationId, version])
  @@map("org_settings_snapshots")
}

`;

if (!schema.includes('model Tenant {')) {
  schema += newModels;
  fs.writeFileSync(schemaPath, schema);
  console.log('Phase 5.1 schemas appended successfully.');
} else {
  console.log('Phase 5.1 schemas already exist.');
}
