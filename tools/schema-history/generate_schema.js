const fs = require('fs');

const BASE_FIELDS = `
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  createdBy String?   @db.Uuid
  updatedBy String?   @db.Uuid
  version   Int       @default(1)
`;

const schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==========================================
// MASTER & LOOKUP DOMAIN
// ==========================================

model Country {
${BASE_FIELDS}
  code String @unique
  name String @unique
  
  states State[]
  @@map("countries")
}

model State {
${BASE_FIELDS}
  code      String
  name      String
  countryId String @db.Uuid

  country Country @relation(fields: [countryId], references: [id], onDelete: Restrict)
  cities  City[]

  @@unique([countryId, code])
  @@map("states")
}

model City {
${BASE_FIELDS}
  name    String
  stateId String @db.Uuid

  state State @relation(fields: [stateId], references: [id], onDelete: Restrict)
  
  addresses Address[]
  branches  Branch[]

  @@map("cities")
}

model Currency {
${BASE_FIELDS}
  code   String @unique
  name   String
  symbol String

  organizations Organization[]

  @@map("currencies")
}

model Language {
${BASE_FIELDS}
  code String @unique
  name String

  @@map("languages")
}

model Holiday {
${BASE_FIELDS}
  name           String
  date           DateTime @db.Date
  organizationId String @db.Uuid

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@index([organizationId, date])
  @@map("holidays")
}

// ==========================================
// USER & SECURITY DOMAIN
// ==========================================

model User {
${BASE_FIELDS}
  email        String    @unique
  passwordHash String
  isActive     Boolean   @default(true)
  lastLoginAt  DateTime?
  mfaEnabled   Boolean   @default(false)
  mfaSecret    String?

  employee      Employee?
  userRoles     UserRole[]
  sessions      Session[]
  loginAttempts LoginAttempt[]
  passwordHistory PasswordHistory[]
  auditLogs     AuditLog[]

  @@map("users")
}

model Role {
${BASE_FIELDS}
  name        String @unique
  description String?

  userRoles   UserRole[]
  permissions RolePermission[]

  @@map("roles")
}

model Permission {
${BASE_FIELDS}
  action   String // e.g., 'CREATE', 'READ', 'UPDATE', 'DELETE'
  resource String // e.g., 'Employee', 'Project'

  rolePermissions RolePermission[]

  @@unique([action, resource])
  @@map("permissions")
}

model RolePermission {
${BASE_FIELDS}
  roleId       String @db.Uuid
  permissionId String @db.Uuid

  role       Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
  permission Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

  @@unique([roleId, permissionId])
  @@map("role_permissions")
}

model UserRole {
${BASE_FIELDS}
  userId String @db.Uuid
  roleId String @db.Uuid

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  role Role @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@unique([userId, roleId])
  @@map("user_roles")
}

model Session {
${BASE_FIELDS}
  userId String @db.Uuid
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  token        String   @unique
  refreshToken String?  @unique
  expiresAt    DateTime
  deviceInfo   String?
  ipAddress    String?

  @@index([userId])
  @@map("sessions")
}

model LoginAttempt {
${BASE_FIELDS}
  userId    String? @db.Uuid
  email     String
  ipAddress String
  success   Boolean
  reason    String?

  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([email])
  @@map("login_attempts")
}

model PasswordHistory {
${BASE_FIELDS}
  userId       String @db.Uuid
  passwordHash String

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("password_history")
}

// ==========================================
// ORGANIZATION DOMAIN
// ==========================================

model Organization {
${BASE_FIELDS}
  name        String
  domain      String? @unique
  taxId       String?
  registrationNumber String?
  currencyId  String @db.Uuid

  currency Currency @relation(fields: [currencyId], references: [id], onDelete: Restrict)

  branches       Branch[]
  departments    Department[]
  teams          Team[]
  employees      Employee[]
  holidays       Holiday[]
  leaveTypes     LeaveType[]
  projects       Project[]
  shifts         Shift[]

  @@map("organizations")
}

model Branch {
${BASE_FIELDS}
  name           String
  organizationId String @db.Uuid
  cityId         String @db.Uuid

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  city         City         @relation(fields: [cityId], references: [id], onDelete: Restrict)
  
  employees Employee[]

  @@map("branches")
}

model Department {
${BASE_FIELDS}
  name           String
  code           String
  organizationId String @db.Uuid

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  employees         Employee[]
  departmentTransfers DepartmentTransfer[]

  @@unique([organizationId, code])
  @@map("departments")
}

model Team {
${BASE_FIELDS}
  name           String
  organizationId String @db.Uuid
  departmentId   String? @db.Uuid

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@map("teams")
}

// ==========================================
// EMPLOYEE DOMAIN
// ==========================================

model Employee {
${BASE_FIELDS}
  userId           String? @unique @db.Uuid // Optional User relationship for separation of Identity and Employee
  organizationId   String @db.Uuid
  branchId         String @db.Uuid
  departmentId     String @db.Uuid
  managerEmployeeId String? @db.Uuid

  employeeCode     String
  firstName        String
  lastName         String
  gender           String?
  dateOfBirth      DateTime? @db.Date
  joiningDate      DateTime @db.Date
  confirmationDate DateTime? @db.Date
  
  designation      String
  employmentType   String // e.g. Full-Time, Part-Time, Contract
  employmentStatus String // e.g. Active, Probation, Notice, Terminated

  user         User?        @relation(fields: [userId], references: [id], onDelete: SetNull)
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Restrict)
  branch       Branch       @relation(fields: [branchId], references: [id], onDelete: Restrict)
  department   Department   @relation(fields: [departmentId], references: [id], onDelete: Restrict)
  manager      Employee?    @relation("ManagerHierarchy", fields: [managerEmployeeId], references: [id], onDelete: SetNull)

  subordinates Employee[] @relation("ManagerHierarchy")
  
  addresses              Address[]
  emergencyContacts      EmergencyContact[]
  educations             Education[]
  experiences            Experience[]
  skills                 Skill[]
  bankDetails            BankDetail[]
  salaryStructures       EmployeeSalaryStructure[]
  salaryHistories        SalaryHistory[]
  departmentTransfers    DepartmentTransfer[]
  designationChanges     DesignationChange[]
  managerChanges         ReportingManagerChange[]
  employmentStatusChanges EmploymentStatusChange[]
  attendances            AttendanceRecord[]
  leaveRequests          LeaveRequest[]
  payslips               Payslip[]
  projectMemberships     ProjectMember[]
  assetAssignments       AssetAssignment[]
  expenses               Expense[]
  travelRequests         TravelRequest[]

  @@unique([organizationId, employeeCode])
  @@index([organizationId])
  @@index([managerEmployeeId])
  @@map("employees")
}

model Address {
${BASE_FIELDS}
  employeeId   String @db.Uuid
  type         String // Current, Permanent
  addressLine1 String
  addressLine2 String?
  cityId       String @db.Uuid
  zipCode      String

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  city     City     @relation(fields: [cityId], references: [id], onDelete: Restrict)

  @@map("addresses")
}

model EmergencyContact {
${BASE_FIELDS}
  employeeId   String @db.Uuid
  name         String
  relationship String
  phoneNumber  String

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("emergency_contacts")
}

model Education {
${BASE_FIELDS}
  employeeId    String @db.Uuid
  degree        String
  institution   String
  yearOfPassing Int
  grade         String?

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("educations")
}

model Experience {
${BASE_FIELDS}
  employeeId  String @db.Uuid
  companyName String
  designation String
  startDate   DateTime @db.Date
  endDate     DateTime? @db.Date

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("experiences")
}

model Skill {
${BASE_FIELDS}
  employeeId  String @db.Uuid
  name        String
  proficiency String // Beginner, Intermediate, Expert

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("skills")
}

model BankDetail {
${BASE_FIELDS}
  employeeId    String @db.Uuid
  bankName      String
  accountName   String
  accountNumber String
  ifscCode      String? // Or equivalent routing number

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("bank_details")
}

// --- History Tables ---

model SalaryHistory {
${BASE_FIELDS}
  employeeId String @db.Uuid
  oldSalary  Decimal @db.Decimal(10,2)
  newSalary  Decimal @db.Decimal(10,2)
  effectiveDate DateTime @db.Date
  reason     String?

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("salary_histories")
}

model DepartmentTransfer {
${BASE_FIELDS}
  employeeId    String @db.Uuid
  oldDepartmentId String? @db.Uuid
  newDepartmentId String @db.Uuid
  effectiveDate DateTime @db.Date
  reason        String?

  employee      Employee    @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  newDepartment Department @relation(fields: [newDepartmentId], references: [id], onDelete: Restrict)

  @@map("department_transfers")
}

model DesignationChange {
${BASE_FIELDS}
  employeeId     String @db.Uuid
  oldDesignation String?
  newDesignation String
  effectiveDate  DateTime @db.Date
  reason         String?

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("designation_changes")
}

model ReportingManagerChange {
${BASE_FIELDS}
  employeeId      String @db.Uuid
  oldManagerId    String? @db.Uuid
  newManagerId    String? @db.Uuid
  effectiveDate   DateTime @db.Date

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("reporting_manager_changes")
}

model EmploymentStatusChange {
${BASE_FIELDS}
  employeeId    String @db.Uuid
  oldStatus     String?
  newStatus     String
  effectiveDate DateTime @db.Date
  reason        String?

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("employment_status_changes")
}

// ==========================================
// RECRUITMENT DOMAIN
// ==========================================

model JobOpening {
${BASE_FIELDS}
  title          String
  description    String
  status         String // Open, Closed, On Hold
  organizationId String @db.Uuid

  candidates Candidate[]

  @@map("job_openings")
}

model Candidate {
${BASE_FIELDS}
  jobOpeningId String @db.Uuid
  firstName    String
  lastName     String
  email        String
  phone        String
  status       String // Applied, Interviewing, Offered, Rejected, Hired

  jobOpening JobOpening @relation(fields: [jobOpeningId], references: [id], onDelete: Restrict)
  interviews Interview[]
  offerLetter OfferLetter?

  @@map("candidates")
}

model Interview {
${BASE_FIELDS}
  candidateId String @db.Uuid
  interviewerId String @db.Uuid // Should probably link to an Employee, but avoiding for simplicity, or we can use string for now
  scheduledAt DateTime
  feedback    String?
  status      String // Scheduled, Completed, Cancelled

  candidate Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)

  @@map("interviews")
}

model OfferLetter {
${BASE_FIELDS}
  candidateId String @unique @db.Uuid
  salaryOffered Decimal @db.Decimal(10,2)
  status      String // Draft, Sent, Accepted, Declined

  candidate Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)

  @@map("offer_letters")
}

// ==========================================
// ATTENDANCE & LEAVE DOMAIN
// ==========================================

model Shift {
${BASE_FIELDS}
  organizationId String @db.Uuid
  name           String
  startTime      DateTime @db.Time
  endTime        DateTime @db.Time

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@map("shifts")
}

model AttendancePolicy {
${BASE_FIELDS}
  name String
  lateThresholdMinutes Int @default(15)
  halfDayThresholdMinutes Int @default(240)

  @@map("attendance_policies")
}

model AttendanceRecord {
${BASE_FIELDS}
  employeeId String @db.Uuid
  date       DateTime @db.Date
  checkIn    DateTime?
  checkOut   DateTime?
  status     String // Present, Absent, Half-Day, Leave, Holiday
  isLocked   Boolean @default(false)

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@unique([employeeId, date])
  @@index([date])
  @@map("attendance_records")
}

model AttendanceLock {
${BASE_FIELDS}
  periodStartDate DateTime @db.Date
  periodEndDate   DateTime @db.Date
  lockedById      String @db.Uuid // User Id who locked

  @@map("attendance_locks")
}

model LeaveType {
${BASE_FIELDS}
  organizationId String @db.Uuid
  name           String // Casual, Sick, Privilege
  isPaid         Boolean @default(true)

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  leaveBalances LeaveBalance[]
  leaveRequests LeaveRequest[]

  @@map("leave_types")
}

model LeaveBalance {
${BASE_FIELDS}
  employeeId  String @db.Uuid
  leaveTypeId String @db.Uuid
  year        Int
  totalDays   Decimal @db.Decimal(5,2)
  usedDays    Decimal @db.Decimal(5,2) @default(0)

  employee  Employee  @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  leaveType LeaveType @relation(fields: [leaveTypeId], references: [id], onDelete: Restrict)

  @@unique([employeeId, leaveTypeId, year])
  @@map("leave_balances")
}

model LeaveRequest {
${BASE_FIELDS}
  employeeId  String @db.Uuid
  leaveTypeId String @db.Uuid
  startDate   DateTime @db.Date
  endDate     DateTime @db.Date
  status      String // Pending, Approved, Rejected, Cancelled
  reason      String?

  employee  Employee  @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  leaveType LeaveType @relation(fields: [leaveTypeId], references: [id], onDelete: Restrict)
  ledgers   LeaveLedger[]

  @@map("leave_requests")
}

model LeaveLedger {
${BASE_FIELDS}
  leaveRequestId String @db.Uuid
  date           DateTime @db.Date
  daysDeducted   Decimal @db.Decimal(4,2)

  leaveRequest LeaveRequest @relation(fields: [leaveRequestId], references: [id], onDelete: Cascade)

  @@map("leave_ledgers")
}

// ==========================================
// PAYROLL DOMAIN
// ==========================================

model PayrollCycle {
${BASE_FIELDS}
  name      String
  startDate DateTime @db.Date
  endDate   DateTime @db.Date
  isClosed  Boolean @default(false)

  payslips Payslip[]
  runs     PayrollRun[]

  @@map("payroll_cycles")
}

model SalaryComponent {
${BASE_FIELDS}
  name String
  type String // Earning, Deduction
  isTaxable Boolean @default(true)

  structures EmployeeSalaryStructure[]
  items      PayrollItem[]

  @@map("salary_components")
}

model EmployeeSalaryStructure {
${BASE_FIELDS}
  employeeId        String @db.Uuid
  salaryComponentId String @db.Uuid
  amount            Decimal @db.Decimal(10,2)

  employee        Employee        @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  salaryComponent SalaryComponent @relation(fields: [salaryComponentId], references: [id], onDelete: Restrict)

  @@unique([employeeId, salaryComponentId])
  @@map("employee_salary_structures")
}

model Payslip {
${BASE_FIELDS}
  employeeId     String @db.Uuid
  payrollCycleId String @db.Uuid
  netPay         Decimal @db.Decimal(10,2)
  status         String // Draft, Approved, Paid

  employee     Employee     @relation(fields: [employeeId], references: [id], onDelete: Restrict)
  payrollCycle PayrollCycle @relation(fields: [payrollCycleId], references: [id], onDelete: Restrict)
  items        PayrollItem[]

  @@unique([employeeId, payrollCycleId])
  @@map("payslips")
}

model PayrollItem {
${BASE_FIELDS}
  payslipId         String @db.Uuid
  salaryComponentId String @db.Uuid
  amount            Decimal @db.Decimal(10,2)

  payslip         Payslip         @relation(fields: [payslipId], references: [id], onDelete: Cascade)
  salaryComponent SalaryComponent @relation(fields: [salaryComponentId], references: [id], onDelete: Restrict)

  @@map("payroll_items")
}

model PayrollRun {
${BASE_FIELDS}
  payrollCycleId String @db.Uuid
  runById        String @db.Uuid // User who triggered
  status         String // Processing, Completed, Failed

  payrollCycle PayrollCycle @relation(fields: [payrollCycleId], references: [id], onDelete: Restrict)

  @@map("payroll_runs")
}

// ==========================================
// PROJECTS & ASSETS DOMAIN
// ==========================================

model Project {
${BASE_FIELDS}
  organizationId String @db.Uuid
  name           String
  description    String?
  status         String // Planning, Active, Completed, On Hold

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  members      ProjectMember[]

  @@map("projects")
}

model ProjectMember {
${BASE_FIELDS}
  projectId  String @db.Uuid
  employeeId String @db.Uuid
  roleInProject String

  project  Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@unique([projectId, employeeId])
  @@map("project_members")
}

model AssetCategory {
${BASE_FIELDS}
  name String @unique

  assets Asset[]

  @@map("asset_categories")
}

model Asset {
${BASE_FIELDS}
  categoryId   String @db.Uuid
  serialNumber String @unique
  name         String
  status       String // Available, Assigned, Maintenance, Retired

  category     AssetCategory @relation(fields: [categoryId], references: [id], onDelete: Restrict)
  assignments  AssetAssignment[]

  @@map("assets")
}

model AssetAssignment {
${BASE_FIELDS}
  assetId      String @db.Uuid
  employeeId   String @db.Uuid
  assignedDate DateTime @db.Date
  returnDate   DateTime? @db.Date

  asset    Asset    @relation(fields: [assetId], references: [id], onDelete: Cascade)
  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("asset_assignments")
}

// ==========================================
// OPERATIONS (TRAVEL, EXPENSES, HELP DESK)
// ==========================================

model ExpenseCategory {
${BASE_FIELDS}
  name String @unique

  expenses Expense[]

  @@map("expense_categories")
}

model Expense {
${BASE_FIELDS}
  employeeId String @db.Uuid
  categoryId String @db.Uuid
  amount     Decimal @db.Decimal(10,2)
  date       DateTime @db.Date
  status     String // Submitted, Approved, Rejected, Paid

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  category ExpenseCategory @relation(fields: [categoryId], references: [id], onDelete: Restrict)

  @@map("expenses")
}

model TravelRequest {
${BASE_FIELDS}
  employeeId  String @db.Uuid
  purpose     String
  destination String
  startDate   DateTime @db.Date
  endDate     DateTime @db.Date
  status      String // Pending, Approved, Rejected

  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("travel_requests")
}

model TicketCategory {
${BASE_FIELDS}
  name String @unique

  tickets Ticket[]

  @@map("ticket_categories")
}

model Ticket {
${BASE_FIELDS}
  title       String
  description String
  categoryId  String @db.Uuid
  status      String // Open, In Progress, Resolved, Closed
  priority    String // Low, Medium, High, Critical
  reporterId  String @db.Uuid // Should be User

  category TicketCategory @relation(fields: [categoryId], references: [id], onDelete: Restrict)
  comments TicketComment[]

  @@map("tickets")
}

model TicketComment {
${BASE_FIELDS}
  ticketId  String @db.Uuid
  authorId  String @db.Uuid // User
  content   String

  ticket Ticket @relation(fields: [ticketId], references: [id], onDelete: Cascade)

  @@map("ticket_comments")
}

// ==========================================
// NOTIFICATIONS & SETTINGS & AUDIT
// ==========================================

model NotificationTemplate {
${BASE_FIELDS}
  code    String @unique
  subject String
  body    String

  @@map("notification_templates")
}

model Notification {
${BASE_FIELDS}
  userId  String @db.Uuid // Recipient User
  title   String
  message String
  isRead  Boolean @default(false)

  @@map("notifications")
}

model DashboardPreference {
${BASE_FIELDS}
  userId String @unique @db.Uuid
  layout Json

  @@map("dashboard_preferences")
}

model AuditLog {
${BASE_FIELDS}
  userId    String? @db.Uuid // User who did the action
  action    String
  tableName String
  recordId  String @db.Uuid
  oldValues Json?
  newValues Json?

  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([tableName, recordId])
  @@map("audit_logs")
}
`;

fs.writeFileSync('d:\\erpvvinfratech\\prisma\\schema.prisma', schema);
console.log('schema.prisma generated successfully.');
