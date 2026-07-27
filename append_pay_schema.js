const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma/schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// Deprecate legacy models
schemaContent = schemaContent.replace(/model PayrollCycle \{/g, '/// @deprecated Use PayPayrollPeriod instead\nmodel PayrollCycle {');
schemaContent = schemaContent.replace(/model Payslip \{/g, '/// @deprecated Use PayPayslip instead\nmodel Payslip {');
schemaContent = schemaContent.replace(/model PayrollItem \{/g, '/// @deprecated Use PayPayslipItem instead\nmodel PayrollItem {');
schemaContent = schemaContent.replace(/model PayrollRun \{/g, '/// @deprecated Use PayPayrollRun instead\nmodel PayrollRun {');

const paySchema = `
// ==========================================
// PHASE 5.6 - PAYROLL MANAGEMENT DOMAIN
// ==========================================

// Global & Currency
model PayPayrollCurrency {
  id              String    @id @default(uuid()) @db.Uuid
  code            String    @unique // INR, USD, EUR
  symbol          String
  name            String
  
  @@map("pay_currencies")
}

// Configuration
model PayPayrollPolicy {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  name            String
  currencyId      String    @db.Uuid

  frequency       String    // Monthly, Weekly, Bi-Weekly
  
  @@map("pay_payroll_policies")
}

model PayPayrollPeriod {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  payrollPolicyId String    @db.Uuid
  
  periodName      String    // January 2026
  startDate       DateTime  @db.Date
  endDate         DateTime  @db.Date
  
  cutOffDate      DateTime? @db.Date
  attendanceLockDate DateTime? @db.Date
  leaveLockDate   DateTime? @db.Date
  paymentDate     DateTime? @db.Date

  @@map("pay_payroll_periods")
}

// Salary Structures & Components
model PaySalaryComponent {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  code            String    @unique
  name            String    // Basic, HRA, PF
  type            String    // Earning, Deduction, Tax, Statutory
  
  formulaVersionId String?  @db.Uuid // Reference to a versioned formula logic in Rules Engine
  isTaxable       Boolean   @default(true)
  
  @@map("pay_salary_components")
}

model PaySalaryStructure {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  name            String
  code            String    @unique
  
  versions        PaySalaryStructureVersion[]
  assignments     PayEmployeeSalaryAssignment[]

  @@map("pay_salary_structures")
}

model PaySalaryStructureVersion {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  salaryStructureId String  @db.Uuid
  
  versionNumber   Int
  effectiveFrom   DateTime  @db.Date
  effectiveTo     DateTime? @db.Date

  componentsConfig Json     // Array of assigned PaySalaryComponent config and order
  
  structure       PaySalaryStructure @relation(fields: [salaryStructureId], references: [id], onDelete: Cascade)

  @@map("pay_salary_structure_versions")
}

model PayEmployeeSalaryAssignment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  salaryStructureId String  @db.Uuid
  
  effectiveFrom   DateTime  @db.Date
  effectiveTo     DateTime? @db.Date
  annualCTC       Float

  structure       PaySalaryStructure @relation(fields: [salaryStructureId], references: [id], onDelete: Restrict)

  @@map("pay_employee_salary_assignments")
}

// Payroll Run & Execution
model PayPayrollRun {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  periodId        String    @db.Uuid
  runType         String    // Regular, Off-Cycle, Settlement
  status          String    // Draft, Collecting, Calculating, Approved, Locked, Processed, Archived
  
  lockedScopes    Json?     // e.g. ["DEPT-1", "EMP-2"]
  
  calculations    PayPayrollCalculation[]
  snapshots       PayPayrollSnapshot[]

  @@map("pay_payroll_runs")
}

model PayPayrollSnapshot {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  payrollRunId    String    @db.Uuid
  employeeId      String    @db.Uuid
  
  snapshotData    Json      // Captures exactly: Salary Structure Version, Attendance Summary, LOP, Leaves, Rules Engine Version

  payrollRun      PayPayrollRun @relation(fields: [payrollRunId], references: [id], onDelete: Cascade)

  @@map("pay_payroll_snapshots")
}

model PayPayrollCalculation {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  payrollRunId    String    @db.Uuid
  employeeId      String    @db.Uuid
  
  grossPay        Float
  netPay          Float
  totalDeductions Float
  currencyId      String    @db.Uuid
  
  payrollRun      PayPayrollRun @relation(fields: [payrollRunId], references: [id], onDelete: Cascade)
  steps           PayCalculationStep[]
  payslips        PayPayslip[]

  @@map("pay_payroll_calculations")
}

model PayCalculationStep {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  calculationId   String    @db.Uuid
  componentId     String    @db.Uuid
  
  calculatedValue Float
  executionOrder  Int
  formulaHash     String?   // To track exact formula used

  calculation     PayPayrollCalculation @relation(fields: [calculationId], references: [id], onDelete: Cascade)

  @@map("pay_calculation_steps")
}

// Outputs
model PayPayslip {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  calculationId   String    @db.Uuid
  
  versionNumber   Int
  documentUrl     String?
  status          String    // Draft, Published, Superseded

  calculation     PayPayrollCalculation @relation(fields: [calculationId], references: [id], onDelete: Cascade)

  @@map("pay_payslips")
}

model PayFinalSettlement {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  
  exitDate        DateTime  @db.Date
  totalAmount     Float
  breakdown       Json      // Leave encashment, notice recovery, etc.
  
  status          String    // Pending, Approved, Processed

  @@map("pay_final_settlements")
}
`;

if (!schemaContent.includes('model PayPayrollCurrency {')) {
  schemaContent += '\n' + paySchema;
  fs.writeFileSync(schemaPath, schemaContent, 'utf8');
  console.log('Phase 5.6 Payroll Schema appended successfully.');
} else {
  console.log('Payroll schema already exists.');
}
