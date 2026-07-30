const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma/schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// Deprecate legacy models
schemaContent = schemaContent.replace(/model LeaveType \{/g, '/// @deprecated Use LevLeaveType instead\nmodel LeaveType {');
schemaContent = schemaContent.replace(/model LeaveBalance \{/g, '/// @deprecated Use LevLeaveBalance instead\nmodel LeaveBalance {');
schemaContent = schemaContent.replace(/model LeaveRequest \{/g, '/// @deprecated Use LevLeaveRequest instead\nmodel LeaveRequest {');
schemaContent = schemaContent.replace(/model LeaveLedger \{/g, '/// @deprecated Use LevLeaveLedger instead\nmodel LeaveLedger {');

const levSchema = `
// ==========================================
// PHASE 5.5 - LEAVE MANAGEMENT DOMAIN
// ==========================================

// Policy Configuration
model LevLeavePolicy {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  name            String
  code            String    @unique
  versions        LevLeavePolicyVersion[]
  assignments     LevLeavePolicyAssignment[]

  @@map("lev_leave_policies")
}

model LevLeavePolicyVersion {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  leavePolicyId   String    @db.Uuid
  versionNumber   Int
  effectiveFrom   DateTime  @db.Date
  effectiveTo     DateTime? @db.Date
  
  // Rule configs via JSON
  sandwichRules   Json?
  holidayRules    Json?
  negativeBalanceRules Json?
  
  leavePolicy     LevLeavePolicy @relation(fields: [leavePolicyId], references: [id], onDelete: Cascade)
  types           LevLeaveType[]

  @@map("lev_leave_policy_versions")
}

model LevLeaveType {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  policyVersionId String    @db.Uuid
  name            String    // Privilege Leave, Casual Leave, Sick Leave, Maternity
  code            String
  isPaid          Boolean   @default(true)
  
  accrualRules        Json? // Configured Rules Engine Payload
  eligibilityRules    Json?
  carryForwardRules   Json?
  encashmentRules     Json?
  
  policyVersion   LevLeavePolicyVersion @relation(fields: [policyVersionId], references: [id], onDelete: Cascade)
  entitlements    LevLeaveEntitlement[]

  @@map("lev_leave_types")
}

model LevLeavePolicyAssignment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  leavePolicyId   String    @db.Uuid
  
  effectiveFrom   DateTime  @db.Date
  effectiveTo     DateTime? @db.Date

  leavePolicy     LevLeavePolicy @relation(fields: [leavePolicyId], references: [id], onDelete: Restrict)
  employee        EmpEmployee    @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("lev_leave_policy_assignments")
}

// Accounting & Ledger
model LevLeaveEntitlement {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  leaveTypeId     String    @db.Uuid
  
  entitledUnits   Float
  validFrom       DateTime  @db.Date
  validTo         DateTime? @db.Date

  leaveType       LevLeaveType @relation(fields: [leaveTypeId], references: [id], onDelete: Restrict)

  @@map("lev_leave_entitlements")
}

model LevLeaveAllocation {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  leaveTypeId     String    @db.Uuid
  
  allocatedUnits  Float
  allocationDate  DateTime  @db.Date
  reason          String

  @@map("lev_leave_allocations")
}

model LevLeaveLedger {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  leaveTypeId     String    @db.Uuid
  
  transactionType String    // Allocation, Accrual, Consumption, Adjustment, CarryForward, Encashment, Expiry
  units           Float     // Positive or Negative
  transactionDate DateTime  @default(now())
  referenceId     String?   @db.Uuid // RequestId, PolicyId etc.
  reason          String?

  @@map("lev_leave_ledgers")
}

model LevLeaveBalance {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  leaveTypeId     String    @db.Uuid
  
  totalAccrued    Float     @default(0)
  totalConsumed   Float     @default(0)
  currentBalance  Float     @default(0) // Derived: Accrued - Consumed + Adjustments
  
  lastCalculated  DateTime  @default(now())

  @@unique([employeeId, leaveTypeId])
  @@map("lev_leave_balances")
}

// Leave Requests
model LevLeaveRequest {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  leaveTypeId     String    @db.Uuid
  
  startDate       DateTime  @db.Date
  endDate         DateTime  @db.Date
  leaveUnits      Float     // 0.25, 0.5, 1.0, etc.
  
  reason          String
  status          String    // Draft, Submitted, PendingApproval, Approved, Scheduled, Consumed, Completed, Rejected, Cancelled, Expired
  workflowId      String?
  
  approvals       LevLeaveApproval[]
  timeline        LevLeaveTimeline[]

  @@map("lev_leave_requests")
}

model LevLeaveApproval {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  leaveRequestId  String    @db.Uuid
  
  approverId      String    @db.Uuid
  level           Int
  status          String    // Pending, Approved, Rejected
  notes           String?
  approvedAt      DateTime?

  leaveRequest    LevLeaveRequest @relation(fields: [leaveRequestId], references: [id], onDelete: Cascade)

  @@map("lev_leave_approvals")
}

// Timeline
model LevLeaveTimeline {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  leaveRequestId  String    @db.Uuid
  
  eventType       String
  description     String?
  actorId         String?   @db.Uuid
  timestamp       DateTime  @default(now())

  leaveRequest    LevLeaveRequest @relation(fields: [leaveRequestId], references: [id], onDelete: Cascade)

  @@map("lev_leave_timelines")
}
`;

if (!schemaContent.includes('model LevLeavePolicy {')) {
  // We need to add levLeavePolicyAssignments to EmpEmployee relation
  schemaContent = schemaContent.replace(/attAttendanceDays        AttAttendanceDay\[\]/, 'attAttendanceDays        AttAttendanceDay[]\n  levLeavePolicyAssignments LevLeavePolicyAssignment[]');

  schemaContent += '\n' + levSchema;
  fs.writeFileSync(schemaPath, schemaContent, 'utf8');
  console.log('Phase 5.5 Leave Schema appended successfully.');
} else {
  console.log('Leave schema already exists.');
}
