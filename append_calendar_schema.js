const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

// ==========================================
// BUSINESS CALENDAR & SCHEDULER PLATFORM
// ==========================================

model Calendar {
  id          String   @id @default(uuid()) @db.Uuid
  code        String   @unique
  name        String
  type        String   // ORGANIZATION, REGION, BRANCH, DEPARTMENT
  timezone    String   @default("UTC") // IANA format like 'Asia/Kolkata'
  
  versions    CalendarVersion[]

  @@map("calendars")
}

model CalendarVersion {
  id              String   @id @default(uuid()) @db.Uuid
  calendarId      String   @db.Uuid
  version         Int
  status          String   @default("DRAFT") // DRAFT, PUBLISHED, ARCHIVED
  effectiveFrom   DateTime?
  effectiveTo     DateTime?
  
  workingWeek     Json     // Definition of normal working days and hours
  holidays        Json     // Array of Holiday configurations
  exceptions      Json?    // Array of ExceptionCalendar configurations
  
  calendar        Calendar @relation(fields: [calendarId], references: [id], onDelete: Cascade)

  @@unique([calendarId, version])
  @@map("calendar_versions")
}

model ShiftTemplate {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  timezone        String   @default("UTC")
  crossesMidnight Boolean  @default(false)
  
  startTime       String   // "22:00:00"
  endTime         String   // "06:00:00"
  graceMinutes    Int      @default(0)
  breaks          Json?    // Array of break windows
  
  assignments     ShiftAssignment[]

  @@map("shift_templates")
}

model ShiftAssignment {
  id              String   @id @default(uuid()) @db.Uuid
  shiftTemplateId String   @db.Uuid
  employeeId      String   @db.Uuid
  effectiveFrom   DateTime?
  effectiveTo     DateTime?

  shiftTemplate   ShiftTemplate @relation(fields: [shiftTemplateId], references: [id], onDelete: Cascade)
  
  @@map("shift_assignments")
}

model PayrollCalendar {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  periodType      String   // WEEKLY, BIWEEKLY, SEMI_MONTHLY, MONTHLY, FISCAL
  periods         Json     // Array of Date boundaries { start: DateTime, end: DateTime }
  
  @@map("payroll_calendars")
}

model Schedule {
  id              String   @id @default(uuid()) @db.Uuid
  jobId           String   @unique // Target BullMQ job key
  jobName         String
  queueName       String
  payload         Json
  
  type            String   // DELAYED, CRON, RRULE
  expression      String?  // cron string or RRULE string
  timezone        String   @default("UTC")
  
  status          String   @default("ACTIVE") // ACTIVE, PAUSED, CANCELLED, COMPLETED
  recoveryPolicy  String   @default("SKIP") // SKIP, EXECUTE_IMMEDIATELY, ESCALATE
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  executions      ScheduleExecution[]

  @@map("schedules")
}

model ScheduleExecution {
  id              String   @id @default(uuid()) @db.Uuid
  scheduleId      String   @db.Uuid
  executedAt      DateTime @default(now())
  status          String   // SUCCESS, FAILED
  durationMs      Int
  errorMessage    String?
  isRecovery      Boolean  @default(false)

  schedule        Schedule @relation(fields: [scheduleId], references: [id], onDelete: Cascade)

  @@map("schedule_executions")
}

`;

if (!schema.includes('model Calendar')) {
  schema += newModels;
  fs.writeFileSync(schemaPath, schema);
  console.log('Calendar schemas appended successfully.');
} else {
  console.log('Calendar schemas already exist.');
}
