const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma/schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// Deprecate legacy models
schemaContent = schemaContent.replace(/model AttendancePolicy \{/g, '/// @deprecated Use AttAttendancePolicyAssignment and rule models instead\nmodel AttendancePolicy {');
schemaContent = schemaContent.replace(/model AttendanceRecord \{/g, '/// @deprecated Use AttAttendanceDay and AttAttendancePunch instead\nmodel AttendanceRecord {');
schemaContent = schemaContent.replace(/model AttendanceLock \{/g, '/// @deprecated Use AttAttendanceLock instead\nmodel AttendanceLock {');

const attSchema = `
// ==========================================
// PHASE 5.4 - ATTENDANCE MANAGEMENT DOMAIN
// ==========================================

// Core Attendance Aggregate
model AttAttendanceDay {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  employeeId      String    @db.Uuid
  date            DateTime  @db.Date
  
  totalWorkedHours Float    @default(0)
  breakHours       Float    @default(0)
  overtimeHours    Float    @default(0)
  
  status          String    // Draft, Calculated, Validated, Locked, Payroll Processed, Archived
  validationStatus String   // Valid, Exception, ManualReview
  
  // LOP Integration Fields
  lopUnits        Float     @default(0)
  lopReason       String?
  isPayableDay    Boolean   @default(true)

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  employee        EmpEmployee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  sessions        AttAttendanceSession[]
  versions        AttAttendanceVersion[]
  exceptions      AttAttendanceException[]
  timeline        AttAttendanceTimeline[]

  @@unique([employeeId, date])
  @@index([tenantId, date])
  @@map("att_attendance_days")
}

// Session grouping multiple punches
model AttAttendanceSession {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  attendanceDayId String    @db.Uuid
  
  sessionStart    DateTime
  sessionEnd      DateTime?
  durationHours   Float?
  sessionType     String    // Work, Overtime, OnDuty
  
  attendanceDay   AttAttendanceDay @relation(fields: [attendanceDayId], references: [id], onDelete: Cascade)
  punches         AttAttendancePunch[]

  @@map("att_attendance_sessions")
}

// Extensible Sources
model AttAttendanceSource {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  name            String    // Biometric, Web, Mobile, QR, NFC, GPS, API, Manual
  type            String
  punches         AttAttendancePunch[]

  @@map("att_attendance_sources")
}

// Granular Punches
model AttAttendancePunch {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  sessionId       String    @db.Uuid
  sourceId        String    @db.Uuid
  
  timestamp       DateTime
  punchType       String    // IN, OUT, BREAK_START, BREAK_END
  
  latitude        Float?
  longitude       Float?
  deviceId        String?
  isManual        Boolean   @default(false)
  manualReason    String?

  session         AttAttendanceSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  source          AttAttendanceSource  @relation(fields: [sourceId], references: [id], onDelete: Restrict)

  @@map("att_attendance_punches")
}

// Versioning and Corrections
model AttAttendanceVersion {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  attendanceDayId String    @db.Uuid
  
  versionNumber   Int
  changes         Json      // Delta of changes
  reason          String
  approvedBy      String?   @db.Uuid
  createdAt       DateTime  @default(now())

  attendanceDay   AttAttendanceDay @relation(fields: [attendanceDayId], references: [id], onDelete: Cascade)

  @@map("att_attendance_versions")
}

model AttAttendanceCorrection {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  date            DateTime  @db.Date
  
  correctionType  String    // MissedPunch, ShiftChange, OvertimeClaim
  requestedData   Json
  status          String    // Pending, Approved, Rejected
  workflowId      String?
  
  @@map("att_attendance_corrections")
}

// Shift Management
model AttShiftTemplate {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  name            String
  shiftType       String    // Fixed, Flexible, CoreHours
  
  startTime       String?   // "09:00"
  endTime         String?   // "18:00"
  isOvernight     Boolean   @default(false)
  
  flexibleHours   Float?
  coreStartTime   String?
  coreEndTime     String?

  assignments     AttShiftAssignment[]

  @@map("att_shift_templates")
}

model AttShiftAssignment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  shiftTemplateId String    @db.Uuid
  
  effectiveFrom   DateTime  @db.Date
  effectiveTo     DateTime? @db.Date

  shiftTemplate   AttShiftTemplate @relation(fields: [shiftTemplateId], references: [id], onDelete: Restrict)

  @@map("att_shift_assignments")
}

// Exceptions
model AttAttendanceException {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  attendanceDayId String    @db.Uuid
  
  exceptionType   String    // LateArrival, EarlyDeparture, MissedPunch, OutOfGeofence
  severity        String    // Warning, Critical
  resolved        Boolean   @default(false)
  resolvedBy      String?   @db.Uuid

  attendanceDay   AttAttendanceDay @relation(fields: [attendanceDayId], references: [id], onDelete: Cascade)

  @@map("att_attendance_exceptions")
}

// Locking
model AttAttendanceLock {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  lockType        String    // Daily, Monthly, Payroll
  
  periodStart     DateTime  @db.Date
  periodEnd       DateTime  @db.Date
  
  lockedAt        DateTime  @default(now())
  lockedBy        String    @db.Uuid

  @@map("att_attendance_locks")
}

// Timeline
model AttAttendanceTimeline {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  attendanceDayId String    @db.Uuid
  
  eventType       String
  description     String?
  actorId         String?   @db.Uuid
  timestamp       DateTime  @default(now())

  attendanceDay   AttAttendanceDay @relation(fields: [attendanceDayId], references: [id], onDelete: Cascade)

  @@map("att_attendance_timelines")
}
`;

if (!schemaContent.includes('model AttAttendanceDay')) {
  schemaContent += '\n' + attSchema;
  fs.writeFileSync(schemaPath, schemaContent, 'utf8');
  console.log('Phase 5.4 Attendance Schema appended successfully.');
} else {
  console.log('Attendance schema already exists.');
}
