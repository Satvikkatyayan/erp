const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf-8');

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
  
  @@map("approval_templates")
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
  
  @@map("approval_template_versions")
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
  createdAt               DateTime                @default(now())
  updatedAt               DateTime                @updatedAt
  
  @@map("expense_claims")
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
  
  @@map("expense_items")
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
  
  @@map("expense_receipts")
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
  
  @@map("expense_snapshots")
}

model ExpenseRiskAssessment {
  id             String       @id @default(uuid()) @db.Uuid
  expenseId      String       @db.Uuid
  expense        ExpenseClaim @relation(fields: [expenseId], references: [id], onDelete: Cascade)
  riskScore      Decimal      @db.Decimal(10, 2)
  ruleBreakdown  Json
  evaluatedAt    DateTime     @default(now())
  
  @@map("expense_risk_assessments")
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
  
  @@map("expense_budgets")
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
  
  @@map("budget_reservations")
}

model BudgetConsumption {
  id               String        @id @default(uuid()) @db.Uuid
  budgetId         String        @db.Uuid
  budget           ExpenseBudget @relation(fields: [budgetId], references: [id])
  expenseId        String        @db.Uuid
  expense          ExpenseClaim  @relation(fields: [expenseId], references: [id])
  amount           Decimal       @db.Decimal(12, 2)
  consumedAt       DateTime      @default(now())
  
  @@map("budget_consumptions")
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
  
  @@map("corporate_card_statements")
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
  
  @@map("corporate_card_imports")
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
  
  @@map("corporate_card_transactions")
}

model CorporateCardReconciliation {
  id             String                   @id @default(uuid()) @db.Uuid
  transactionId  String                   @unique @db.Uuid
  transaction    CorporateCardTransaction @relation(fields: [transactionId], references: [id])
  expenseItemId  String                   @db.Uuid
  reconciledAt   DateTime                 @default(now())
  
  @@map("corporate_card_reconciliations")
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
  
  @@map("travel_requests")
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
  
  @@map("travel_advances")
}
`;

if (!schema.includes('model ExpenseClaim')) {
    schema += NEW_MODELS;
    fs.writeFileSync(schemaPath, schema);
    console.log('Appended Expense & Travel Management tables to schema.');
} else {
    console.log('ExpenseClaim model already exists in schema.prisma. Skipping append.');
}
