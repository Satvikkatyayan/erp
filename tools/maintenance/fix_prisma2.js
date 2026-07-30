const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
const schema = fs.readFileSync(schemaPath, 'utf-8');
const lines = schema.split('\n');

const startIndex = lines.findIndex(line => line.includes('// ENTERPRISE EXPENSE & TRAVEL MANAGEMENT MODULE (Phase 5.12)'));

if (startIndex === -1) {
    console.error('Could not find start index');
    process.exit(1);
}

// Slice out the old models completely (we will back up slightly to remove the surrounding comments)
let beforeModels = lines.slice(0, startIndex - 1).join('\n');

// Remove offending lines from EmpEmployee
beforeModels = beforeModels.replace(/.*expenseClaims\s+ExpenseClaim\[\]\s+@relation\("EmployeeExpenses"\).*\n?/g, '');
beforeModels = beforeModels.replace(/.*travelRequests\s+TravelRequest\[\]\s+@relation\("EmployeeTravels"\).*\n?/g, '');
beforeModels = beforeModels.replace(/.*corporateCards\s+CorporateCard\[\]\s+@relation\("EmployeeCards"\).*\n?/g, '');
beforeModels = beforeModels.replace(/.*expenses\s+Expense\[\].*\n?/g, '');

const NEW_MODELS = `
// ==========================================
// EXPENSE & TRAVEL MANAGEMENT
// ==========================================

model ApprovalTemplate {
  id              String                    @id @default(uuid()) @db.Uuid
  name            String
  description     String?
  versions        ApprovalTemplateVersion[]
  createdAt       DateTime                  @default(now())
  updatedAt       DateTime                  @updatedAt
}

model ApprovalTemplateVersion {
  id              String            @id @default(uuid()) @db.Uuid
  templateId      String            @db.Uuid
  template        ApprovalTemplate  @relation(fields: [templateId], references: [id])
  versionNumber   Int
  rulesSnapshot   Json
  activeFrom      DateTime
  activeTo        DateTime?
  createdAt       DateTime          @default(now())
}

model ExpenseClaim {
  id                      String                  @id @default(uuid()) @db.Uuid
  employeeId              String                  @db.Uuid
  title                   String
  status                  String                  @default("DRAFT") // DRAFT, SUBMITTED, POLICY_VALIDATION, APPROVAL, FINANCE_APPROVAL, PAYROLL_REIMBURSEMENT, CLOSED
  totalAmount             Decimal                 @db.Decimal(12, 2)
  currencyCode            String
  submittedAt             DateTime?
  policyVersionId         String                  @db.Uuid
  approvalMatrixVersionId String                  @db.Uuid
  items                   ExpenseItem[]
  snapshots               ExpenseSnapshot[]
  riskAssessments         ExpenseRiskAssessment[]
  budgetConsumptions      BudgetConsumption[]
  budgetReservations      BudgetReservation[]
  timeline                ExpenseTimeline[]
  createdAt               DateTime                @default(now())
  updatedAt               DateTime                @updatedAt
}

model ExpenseItem {
  id                      String           @id @default(uuid()) @db.Uuid
  expenseId               String           @db.Uuid
  expense                 ExpenseClaim     @relation(fields: [expenseId], references: [id], onDelete: Cascade)
  date                    DateTime
  categoryId              String           @db.Uuid
  amount                  Decimal          @db.Decimal(12, 2)
  currencyCode            String
  exchangeRate            Decimal?         @db.Decimal(10, 6)
  exchangeRateProvider    String?
  exchangeRateCapturedAt  DateTime?
  baseCurrency            String
  baseAmount              Decimal          @db.Decimal(12, 2)
  description             String?
  receipts                ExpenseReceipt[]
  createdAt               DateTime         @default(now())
  updatedAt               DateTime         @updatedAt
}

model ExpenseReceipt {
  id               String       @id @default(uuid()) @db.Uuid
  expenseItemId    String       @db.Uuid
  expenseItem      ExpenseItem  @relation(fields: [expenseItemId], references: [id], onDelete: Cascade)
  fileUrl          String
  ocrStatus        String       @default("PENDING") // PENDING, PROCESSED, FAILED
  ocrEngine        String?
  ocrVersion       String?
  vendor           String?
  invoiceNumber    String?
  receiptDate      DateTime?
  confidence       Decimal?     @db.Decimal(5, 2)
  recognizedAmount Decimal?     @db.Decimal(12, 2)
  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt
}

model ExpenseSnapshot {
  id                      String       @id @default(uuid()) @db.Uuid
  expenseId               String       @db.Uuid
  expense                 ExpenseClaim @relation(fields: [expenseId], references: [id], onDelete: Cascade)
  policyVersionId         String       @db.Uuid
  approvalMatrixVersionId String       @db.Uuid
  exchangeRates           Json
  budgetAllocation        Json
  reimbursementRef        String?
  riskScore               Decimal?     @db.Decimal(10, 2)
  approvalChain           Json
  createdAt               DateTime     @default(now())
}

model ExpenseRiskAssessment {
  id             String       @id @default(uuid()) @db.Uuid
  expenseId      String       @db.Uuid
  expense        ExpenseClaim @relation(fields: [expenseId], references: [id], onDelete: Cascade)
  riskScore      Decimal      @db.Decimal(10, 2)
  ruleBreakdown  Json
  evaluatedAt    DateTime     @default(now())
}

model ExpenseTimeline {
  id               String       @id @default(uuid()) @db.Uuid
  expenseId        String       @db.Uuid
  expense          ExpenseClaim @relation(fields: [expenseId], references: [id], onDelete: Cascade)
  event            String
  description      String?
  actorId          String       @db.Uuid
  createdAt        DateTime     @default(now())
}

model ExpenseBudget {
  id               String              @id @default(uuid()) @db.Uuid
  departmentId     String              @db.Uuid
  totalAmount      Decimal             @db.Decimal(12, 2)
  currencyCode     String
  periodStart      DateTime
  periodEnd        DateTime
  reservations     BudgetReservation[]
  consumptions     BudgetConsumption[]
  createdAt        DateTime            @default(now())
  updatedAt        DateTime            @updatedAt
}

model BudgetReservation {
  id               String        @id @default(uuid()) @db.Uuid
  budgetId         String        @db.Uuid
  budget           ExpenseBudget @relation(fields: [budgetId], references: [id])
  expenseId        String        @db.Uuid
  expense          ExpenseClaim  @relation(fields: [expenseId], references: [id])
  amount           Decimal       @db.Decimal(12, 2)
  status           String        @default("PENDING") // PENDING, CONVERTED, RELEASED
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
}

model BudgetConsumption {
  id               String        @id @default(uuid()) @db.Uuid
  budgetId         String        @db.Uuid
  budget           ExpenseBudget @relation(fields: [budgetId], references: [id])
  expenseId        String        @db.Uuid
  expense          ExpenseClaim  @relation(fields: [expenseId], references: [id])
  amount           Decimal       @db.Decimal(12, 2)
  consumedAt       DateTime      @default(now())
}

model CorporateCardStatement {
  id             String                @id @default(uuid()) @db.Uuid
  cardId         String                @db.Uuid
  statementDate  DateTime
  totalAmount    Decimal               @db.Decimal(12, 2)
  status         String                @default("PENDING")
  imports        CorporateCardImport[]
  createdAt      DateTime              @default(now())
  updatedAt      DateTime              @updatedAt
}

model CorporateCardImport {
  id             String                     @id @default(uuid()) @db.Uuid
  statementId    String                     @db.Uuid
  statement      CorporateCardStatement     @relation(fields: [statementId], references: [id])
  fileName       String
  importDate     DateTime
  status         String                     @default("PROCESSING")
  totalRecords   Int
  processed      Int
  transactions   CorporateCardTransaction[]
  createdAt      DateTime                   @default(now())
  updatedAt      DateTime                   @updatedAt
}

model CorporateCardTransaction {
  id             String                       @id @default(uuid()) @db.Uuid
  importId       String                       @db.Uuid
  import         CorporateCardImport          @relation(fields: [importId], references: [id])
  amount         Decimal                      @db.Decimal(12, 2)
  merchant       String
  transactionDate DateTime
  reconciliation CorporateCardReconciliation?
  createdAt      DateTime                     @default(now())
  updatedAt      DateTime                     @updatedAt
}

model CorporateCardReconciliation {
  id             String                   @id @default(uuid()) @db.Uuid
  transactionId  String                   @unique @db.Uuid
  transaction    CorporateCardTransaction @relation(fields: [transactionId], references: [id])
  expenseItemId  String                   @db.Uuid
  reconciledAt   DateTime                 @default(now())
}

model TravelRequest {
  id               String          @id @default(uuid()) @db.Uuid
  employeeId       String          @db.Uuid
  purpose          String
  destination      String
  startDate        DateTime
  endDate          DateTime
  status           String          @default("DRAFT") // DRAFT, SUBMITTED, APPROVED, ADVANCE_ISSUED, TRAVEL_STARTED, TRAVEL_COMPLETED, EXPENSE_SUBMITTED, SETTLEMENT, CLOSED, ARCHIVED
  advances         TravelAdvance[]
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt
}

model TravelAdvance {
  id               String        @id @default(uuid()) @db.Uuid
  travelRequestId  String        @db.Uuid
  travelRequest    TravelRequest @relation(fields: [travelRequestId], references: [id])
  amount           Decimal       @db.Decimal(12, 2)
  currencyCode     String
  issuedAt         DateTime?
  status           String        @default("PENDING") // PENDING, ISSUED, SETTLED
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
}
`;

fs.writeFileSync(schemaPath, beforeModels + '\n' + NEW_MODELS);
console.log('Fixed Prisma Schema!');
