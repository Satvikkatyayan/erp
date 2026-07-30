const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma/schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// =====================================================
// PHASE 5.7.1 - PERFORMANCE MANAGEMENT ENHANCEMENTS
// =====================================================

const perfV2Schema = `
// ==========================================
// PHASE 5.7.1 - PERFORMANCE MANAGEMENT V2
// ==========================================

// --- Review Templates (Versioned) ---

model PerfReviewTemplate {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  name            String
  description     String?
  status          String    @default("ACTIVE") // ACTIVE, ARCHIVED

  versions        PerfReviewTemplateVersion[]

  @@map("perf_review_templates")
}

model PerfReviewTemplateVersion {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  templateId      String    @db.Uuid
  versionNumber   Int
  status          String    @default("DRAFT") // DRAFT, PUBLISHED, ARCHIVED
  sectionsConfig  Json      // Sections, weights, rating criteria, instructions
  effectiveFrom   DateTime? @db.Date
  effectiveTo     DateTime? @db.Date
  createdAt       DateTime  @default(now())

  template        PerfReviewTemplate @relation(fields: [templateId], references: [id], onDelete: Cascade)

  @@map("perf_review_template_versions")
}

// --- Calibration History (Audit Trail) ---

model PerfCalibrationHistory {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  calibrationId   String    @db.Uuid
  ratingId        String    @db.Uuid
  previousScore   Float
  newScore        Float
  adjustedBy      String    @db.Uuid
  reason          String?
  stage           String    // Manager, HR, CalibrationCommittee, Executive
  workflowStepId  String?   @db.Uuid // Reference to Workflow SDK step
  adjustedAt      DateTime  @default(now())

  @@map("perf_calibration_history")
}

// --- Score Trace (Explainability) ---

model PerfScoreTrace {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  cycleId         String    @db.Uuid
  employeeId      String    @db.Uuid
  ratingId        String?   @db.Uuid
  traceData       Json      // Ordered steps: [{step, component, rawScore, weight, weightedScore, cumulativeScore}]
  goalScore       Float?
  competencyScore Float?
  kpiScore        Float?
  attendanceScore Float?
  leaveScore      Float?
  weightedTotal   Float?
  normalizedScore Float?
  finalRating     Float?
  engineVersion   String?
  rulesVersion    String?
  createdAt       DateTime  @default(now())

  @@map("perf_score_traces")
}

// --- Review Snapshot (Outputs) ---

model PerfReviewSnapshot {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  cycleId         String    @db.Uuid
  employeeId      String    @db.Uuid
  reviewId        String    @db.Uuid
  snapshotType    String    @default("FINALIZED") // FINALIZED, REOPENED, CORRECTED
  reviewData      Json      // Complete review output: ratings, comments, scores, calibration
  scoreTrace      Json?     // Copy of PerfScoreTrace at time of finalization
  templateVersionId String? @db.Uuid
  finalScore      Float?
  finalLabel      String?   // Rating label at finalization
  createdAt       DateTime  @default(now())

  @@map("perf_review_snapshots")
}

// --- Development Recommendations ---

model PerfDevelopmentRecommendation {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  cycleId         String    @db.Uuid
  employeeId      String    @db.Uuid
  competencyId    String?   @db.Uuid
  skillGap        Float?    // targetLevel - currentLevel
  recommendationType String // Training, Mentoring, StretchAssignment, Certification, Coaching, JobRotation
  priority        String    @default("MEDIUM") // LOW, MEDIUM, HIGH, CRITICAL
  description     String?
  status          String    @default("GENERATED") // GENERATED, ACKNOWLEDGED, IN_PROGRESS, COMPLETED
  createdAt       DateTime  @default(now())

  @@map("perf_development_recommendations")
}

// --- Promotion Recommendations ---

model PerfPromotionRecommendation {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  cycleId         String    @db.Uuid
  employeeId      String    @db.Uuid
  ratingId        String    @db.Uuid
  currentPositionId String? @db.Uuid
  recommendedPositionId String? @db.Uuid
  justification   String?
  status          String    @default("PENDING") // PENDING, APPROVED, REJECTED, PUBLISHED
  createdAt       DateTime  @default(now())

  @@map("perf_promotion_recommendations")
}

// --- Review SLA Tracking ---

model PerfReviewSLA {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  reviewId        String    @db.Uuid
  assignedAt      DateTime?
  startedAt       DateTime?
  submittedAt     DateTime?
  reviewedAt      DateTime?
  approvedAt      DateTime?
  finalizedAt     DateTime?
  reopenedAt      DateTime?
  dueDateSelf     DateTime? @db.Date
  dueDateManager  DateTime? @db.Date
  dueDatePeer     DateTime? @db.Date
  dueDateHR       DateTime? @db.Date
  isOverdue       Boolean   @default(false)

  @@map("perf_review_slas")
}
`;

if (!schemaContent.includes('model PerfReviewTemplate {')) {
  schemaContent += '\n' + perfV2Schema;
  fs.writeFileSync(schemaPath, schemaContent, 'utf8');
  console.log('Phase 5.7.1 Performance V2 Schema appended successfully.');
} else {
  console.log('Performance V2 schema already exists.');
}
