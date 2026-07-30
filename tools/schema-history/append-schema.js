const fs = require('fs');
const file = 'd:/erpvvinfratech/prisma/schema.prisma';

const model = `
model AttendanceSummary {
  id String @id @default(uuid()) @db.Uuid
  employeeId String @db.Uuid
  payrollPeriodId String @db.Uuid
  
  version Int @default(1)
  generatedAt DateTime @default(now())
  generatedById String? @db.Uuid

  timeMetrics Json
  attendanceMetrics Json
  exceptionMetrics Json
  leaveSummary Json
  projectSiteSummary Json
  sourceMusterIds String[] @db.Uuid
  checksum String?

  employee EmpEmployee @relation(fields: [employeeId], references: [id])
  payrollPeriod PayPayrollPeriod @relation(fields: [payrollPeriodId], references: [id])

  @@map("att_attendance_summaries")
}
`;

fs.appendFileSync(file, model);
console.log('Appended AttendanceSummary');
