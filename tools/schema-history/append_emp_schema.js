const fs = require('fs');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const empModels = `

// ==========================================
// PHASE 5.2: EMPLOYEE MANAGEMENT MODULE
// ==========================================

model EmpEmployee {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  organizationId  String   @db.Uuid
  
  employeeNumber  String   @unique
  status          String   @default("DRAFT") // DRAFT, JOINED, PROBATION, CONFIRMED, EXITED
  
  userId          String?  @db.Uuid @unique // Link to IAM
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  organization    Organization @relation(fields: [organizationId], references: [id])
  
  personalDetails EmpPersonalDetails?
  employmentContracts EmpEmploymentContract[]
  jobAssignments  EmpJobAssignment[]
  reportingAssignments EmpReportingAssignment[]
  snapshots       EmpEmployeeSnapshot[]
  timeline        EmpEmployeeTimeline[]
  probationRecords EmpProbationRecord[]
  
  @@map("emp_employees")
}

model EmpPersonalDetails {
  id              String   @id @default(uuid()) @db.Uuid
  employeeId      String   @unique @db.Uuid
  
  firstName       String
  lastName        String
  dateOfBirth     DateTime?
  gender          String?
  maritalStatus   String?
  nationality     String?
  bloodGroup      String?
  
  employee        EmpEmployee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  
  @@map("emp_personal_details")
}

model EmpEmploymentContract {
  id              String   @id @default(uuid()) @db.Uuid
  employeeId      String   @db.Uuid
  
  contractType    String   // FULL_TIME, CONTRACT, INTERN
  startDate       DateTime
  endDate         DateTime?
  probationDays   Int      @default(0)
  noticePeriodDays Int     @default(30)
  
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  employee        EmpEmployee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  
  @@map("emp_employment_contracts")
}

model EmpProbationRecord {
  id              String   @id @default(uuid()) @db.Uuid
  employeeId      String   @db.Uuid
  
  startDate       DateTime
  expectedEndDate DateTime
  actualEndDate   DateTime?
  status          String   @default("IN_PROGRESS") // IN_PROGRESS, EXTENDED, CONFIRMED, FAILED
  reviewerId      String?  @db.Uuid
  
  employee        EmpEmployee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  
  @@map("emp_probation_records")
}

model EmpPosition {
  id              String   @id @default(uuid()) @db.Uuid
  tenantId        String   @db.Uuid
  organizationId  String   @db.Uuid
  departmentId    String   @db.Uuid
  designationId   String   @db.Uuid
  
  code            String
  title           String
  headcount       Int      @default(1)
  status          String   @default("OPEN")
  
  department      Department @relation(fields: [departmentId], references: [id])
  designation     Designation @relation(fields: [designationId], references: [id])
  jobAssignments  EmpJobAssignment[]
  
  @@map("emp_positions")
}

model EmpJobAssignment {
  id              String   @id @default(uuid()) @db.Uuid
  employeeId      String   @db.Uuid
  
  positionId      String   @db.Uuid
  departmentId    String   @db.Uuid
  branchId        String   @db.Uuid
  
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  reason          String?
  workflowId      String?  @db.Uuid
  
  employee        EmpEmployee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  position        EmpPosition @relation(fields: [positionId], references: [id])
  department      Department  @relation(fields: [departmentId], references: [id])
  branch          Branch      @relation(fields: [branchId], references: [id])
  
  @@map("emp_job_assignments")
}

model EmpReportingAssignment {
  id              String   @id @default(uuid()) @db.Uuid
  employeeId      String   @db.Uuid
  
  managerId       String   @db.Uuid
  relationshipType String  @default("DIRECT") // DIRECT, MATRIX, MENTOR, HR_PARTNER
  
  effectiveFrom   DateTime @default(now())
  effectiveTo     DateTime?
  
  employee        EmpEmployee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  
  @@map("emp_reporting_assignments")
}

model EmpEmployeeTimeline {
  id              String   @id @default(uuid()) @db.Uuid
  employeeId      String   @db.Uuid
  
  eventType       String   // JOINED, PROMOTED, TRANSFERRED, EXITED
  eventDate       DateTime @default(now())
  description     String
  metadata        Json?
  
  employee        EmpEmployee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  
  @@map("emp_employee_timeline")
}

model EmpEmployeeSnapshot {
  id              String   @id @default(uuid()) @db.Uuid
  employeeId      String   @db.Uuid
  
  payload         Json     // Flattened representation of the employee
  generatedAt     DateTime @default(now())
  
  employee        EmpEmployee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  
  @@map("emp_employee_snapshots")
}

`;

schema += empModels;

// Fix missing reverse relations on Organization Domain modules
schema = schema.replace('@@map("org_departments")', 'positions EmpPosition[]\\n  jobAssignments EmpJobAssignment[]\\n\\n  @@map("org_departments")');
schema = schema.replace('@@map("org_designations")', 'positions EmpPosition[]\\n\\n  @@map("org_designations")');
schema = schema.replace('@@map("org_branches")', 'jobAssignments EmpJobAssignment[]\\n\\n  @@map("org_branches")');
schema = schema.replace('@@map("org_organizations")', 'empEmployees EmpEmployee[]\\n\\n  @@map("org_organizations")');

fs.writeFileSync(schemaPath, schema);
console.log('Employee Schema Appended.');
