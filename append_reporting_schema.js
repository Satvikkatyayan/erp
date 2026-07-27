const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

// ==========================================
// ENTERPRISE REPORTING & ANALYTICS PLATFORM
// ==========================================

model ReportDataset {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique // employee_data, leave_balances
  name            String
  description     String?
  fields          Json     // Schema of available fields and aggregations
  securityModel   String   // RBAC, ORGANIZATION, PUBLIC
  
  @@map("report_datasets")
}

model Report {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  datasetId       String   @db.Uuid
  
  activeVersionId String?  @db.Uuid
  
  versions        ReportVersion[]

  @@map("reports")
}

model ReportVersion {
  id              String   @id @default(uuid()) @db.Uuid
  reportId        String   @db.Uuid
  version         Int
  status          String   @default("DRAFT") // DRAFT, PUBLISHED, ARCHIVED
  
  config          Json     // columns, filters, sorting, visualization type
  calculatedFields Json?   // [{ name: "AnnualSalary", formula: "salary * 12" }]
  
  report          Report   @relation(fields: [reportId], references: [id], onDelete: Cascade)
  
  @@unique([reportId, version])
  @@map("report_versions")
}

model Dashboard {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  ownerId         String?  @db.Uuid
  organizationId  String?  @db.Uuid
  
  versions        DashboardVersion[]

  @@map("dashboards")
}

model DashboardVersion {
  id              String   @id @default(uuid()) @db.Uuid
  dashboardId     String   @db.Uuid
  version         Int
  status          String   @default("DRAFT") // DRAFT, PUBLISHED, ARCHIVED
  
  layout          Json     // React-Grid-Layout format mapping to Widgets
  widgets         Json     // Array of reports/KPIs
  
  dashboard       Dashboard @relation(fields: [dashboardId], references: [id], onDelete: Cascade)
  
  @@unique([dashboardId, version])
  @@map("dashboard_versions")
}

model KPI {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  datasetId       String   @db.Uuid
  
  formula         String   // AVG(salary)
  timeWindow      String   // LAST_30_DAYS
  thresholds      Json?    // { warning: 5000, critical: 2000 }
  
  @@map("kpis")
}

model ReportSnapshot {
  id              String   @id @default(uuid()) @db.Uuid
  reportVersionId String   @db.Uuid
  
  payload         Json     // Materialized data
  hash            String   // Cache signature
  
  createdAt       DateTime @default(now())
  expiresAt       DateTime?
  
  @@map("report_snapshots")
}

model ReportExecution {
  id              String   @id @default(uuid()) @db.Uuid
  reportVersionId String   @db.Uuid
  
  executedBy      String?  @db.Uuid
  durationMs      Int
  cacheHit        Boolean  @default(false)
  
  explainability  Json     // Filters applied, dataset version, fresh timestamp
  
  createdAt       DateTime @default(now())
  
  @@map("report_executions")
}

model ScheduledReport {
  id              String   @id @default(uuid()) @db.Uuid
  reportId        String   @db.Uuid
  cronExpression  String
  format          String   // CSV, PDF, EXCEL
  
  recipients      Json     // Array of user IDs or emails
  
  @@map("scheduled_reports")
}

`;

if (!schema.includes('model ReportDataset {')) {
  schema += newModels;
  fs.writeFileSync(schemaPath, schema);
  console.log('Reporting schemas appended successfully.');
} else {
  console.log('Reporting schemas already exist.');
}
