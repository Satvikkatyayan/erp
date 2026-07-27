const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma/schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

const perfSchema = `
// ==========================================
// PHASE 5.7 - PERFORMANCE MANAGEMENT DOMAIN
// ==========================================

// --- Cycles & Configuration ---

model PerfPerformanceCycle {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  name            String
  cycleType       String    // Annual, Half-Yearly, Quarterly, Monthly, Probation, Promotion, Custom
  status          String    @default("Draft") // Draft, GoalsAssigned, SelfReview, ManagerReview, PeerReview, Calibration, HRReview, Finalized, Archived
  startDate       DateTime  @db.Date
  endDate         DateTime  @db.Date
  lockedScopes    Json?     // Employee, Department, Cycle, Organization level locks

  stages          PerfCycleStage[]
  reviews         PerfReview[]
  snapshots       PerfPerformanceSnapshot[]

  @@map("perf_performance_cycles")
}

model PerfCycleStage {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  cycleId         String    @db.Uuid
  stageName       String    // GoalSetting, SelfReview, ManagerReview, PeerReview, Calibration, Finalization
  stageOrder      Int
  startDate       DateTime? @db.Date
  endDate         DateTime? @db.Date
  status          String    @default("Pending") // Pending, Active, Completed

  cycle           PerfPerformanceCycle @relation(fields: [cycleId], references: [id], onDelete: Cascade)

  @@map("perf_cycle_stages")
}

model PerfCycleConfiguration {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  enabledReviewTypes Json   // ["Self", "Manager", "Peer", "SkipLevel", "HR", "360"]
  goalWeightingStrategy String @default("Weighted") // Weighted, Equal, Custom
  ratingScaleId   String?   @db.Uuid
  forcedDistribution Boolean @default(false)

  @@map("perf_cycle_configurations")
}

// --- Goals (Versioned) ---

model PerfGoal {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  title           String
  description     String?
  category        String?   // Business, Development, Stretch
  versionNumber   Int       @default(1)
  parentGoalId    String?   @db.Uuid  // For alignment cascading
  isActive        Boolean   @default(true)

  assignments     PerfGoalAssignment[]
  milestones      PerfGoalMilestone[]

  @@map("perf_goals")
}

model PerfGoalTemplate {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  title           String
  description     String?
  category        String?
  defaultWeight   Float?

  @@map("perf_goal_templates")
}

model PerfGoalAssignment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  cycleId         String    @db.Uuid
  employeeId      String    @db.Uuid
  goalId          String    @db.Uuid
  weight          Float     @default(0)
  targetValue     Float?
  status          String    @default("Assigned") // Assigned, InProgress, Completed, Cancelled

  goal            PerfGoal  @relation(fields: [goalId], references: [id], onDelete: Cascade)
  progress        PerfGoalProgress[]

  @@map("perf_goal_assignments")
}

model PerfGoalProgress {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assignmentId    String    @db.Uuid
  goalVersionNumber Int     // Tracks which version of the goal this was recorded against
  progressValue   Float
  note            String?
  recordedAt      DateTime  @default(now())

  assignment      PerfGoalAssignment @relation(fields: [assignmentId], references: [id], onDelete: Cascade)

  @@map("perf_goal_progress")
}

model PerfGoalMilestone {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  goalId          String    @db.Uuid
  title           String
  dueDate         DateTime? @db.Date
  isCompleted     Boolean   @default(false)

  goal            PerfGoal  @relation(fields: [goalId], references: [id], onDelete: Cascade)

  @@map("perf_goal_milestones")
}

model PerfGoalDependency {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  goalId          String    @db.Uuid
  dependsOnGoalId String    @db.Uuid
  dependencyType  String    @default("BlockedBy") // BlockedBy, RelatedTo, ContributesTo

  @@map("perf_goal_dependencies")
}

// --- Reviews (Versioned, Multi-Rater) ---

model PerfReview {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  cycleId         String    @db.Uuid
  employeeId      String    @db.Uuid
  status          String    @default("Draft") // Draft, InProgress, Submitted, Finalized
  finalRatingId   String?   @db.Uuid
  templateVersionId String? @db.Uuid // Reference to versioned review template

  cycle           PerfPerformanceCycle @relation(fields: [cycleId], references: [id], onDelete: Cascade)
  versions        PerfReviewVersion[]
  participants    PerfReviewParticipant[]
  comments        PerfReviewComment[]
  competencyRatings PerfCompetencyRating[]

  @@map("perf_reviews")
}

model PerfReviewVersion {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  reviewId        String    @db.Uuid
  versionNumber   Int
  reviewData      Json      // Frozen review content at this version
  createdAt       DateTime  @default(now())

  review          PerfReview @relation(fields: [reviewId], references: [id], onDelete: Cascade)

  @@map("perf_review_versions")
}

model PerfReviewParticipant {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  reviewId        String    @db.Uuid
  participantId   String    @db.Uuid  // The reviewer employee
  reviewType      String    // Self, Manager, Peer, SkipLevel, HR
  status          String    @default("Pending") // Pending, Submitted
  submittedAt     DateTime?
  ratingGiven     Float?
  comments        String?

  review          PerfReview @relation(fields: [reviewId], references: [id], onDelete: Cascade)

  @@map("perf_review_participants")
}

model PerfReviewComment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  reviewId        String    @db.Uuid
  authorId        String    @db.Uuid
  content         String
  createdAt       DateTime  @default(now())

  review          PerfReview @relation(fields: [reviewId], references: [id], onDelete: Cascade)

  @@map("perf_review_comments")
}

// --- Competencies ---

model PerfCompetencyCategory {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  name            String    // Technical, Behavioral, Leadership
  competencies    PerfCompetency[]

  @@map("perf_competency_categories")
}

model PerfCompetency {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  categoryId      String    @db.Uuid
  name            String
  description     String?

  category        PerfCompetencyCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  assignments     PerfCompetencyAssignment[]

  @@map("perf_competencies")
}

model PerfCompetencyAssignment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  competencyId    String    @db.Uuid
  employeeId      String    @db.Uuid
  targetLevel     Float?    // For skill gap analysis
  currentLevel    Float?

  competency      PerfCompetency @relation(fields: [competencyId], references: [id], onDelete: Cascade)

  @@map("perf_competency_assignments")
}

model PerfCompetencyRating {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  reviewId        String    @db.Uuid
  competencyId    String    @db.Uuid
  ratedById       String    @db.Uuid
  rating          Float

  review          PerfReview @relation(fields: [reviewId], references: [id], onDelete: Cascade)

  @@map("perf_competency_ratings")
}

// --- Ratings & Calibration ---

model PerfRatingScale {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  name            String
  levels          Json      // [{value: 1, label: "Needs Improvement"}, {value: 5, label: "Exceptional"}]

  @@map("perf_rating_scales")
}

model PerfRating {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  cycleId         String    @db.Uuid
  employeeId      String    @db.Uuid
  overallScore    Float
  ratingLabel     String?   // "Exceeds Expectations"

  weightedScores  PerfWeightedScore[]
  calibration     PerfCalibration?

  @@map("perf_ratings")
}

model PerfWeightedScore {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  ratingId        String    @db.Uuid
  goalAssignmentId String   @db.Uuid
  weight          Float
  score           Float
  weightedValue   Float     // weight * score

  rating          PerfRating @relation(fields: [ratingId], references: [id], onDelete: Cascade)

  @@map("perf_weighted_scores")
}

model PerfCalibration {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  ratingId        String    @db.Uuid @unique
  originalScore   Float
  calibratedScore Float
  calibratedBy    String    @db.Uuid
  reason          String?
  calibratedAt    DateTime  @default(now())

  rating          PerfRating @relation(fields: [ratingId], references: [id], onDelete: Cascade)

  @@map("perf_calibrations")
}

// --- KPIs ---

model PerfKPI {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  name            String
  code            String    @unique
  unit            String    // Revenue, Count, Percentage, Score
  targetValue     Float?

  assignments     PerfKPIAssignment[]

  @@map("perf_kpis")
}

model PerfKPIAssignment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  kpiId           String    @db.Uuid
  employeeId      String    @db.Uuid
  cycleId         String    @db.Uuid
  targetValue     Float

  kpi             PerfKPI   @relation(fields: [kpiId], references: [id], onDelete: Cascade)
  results         PerfKPIResult[]

  @@map("perf_kpi_assignments")
}

model PerfKPIResult {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assignmentId    String    @db.Uuid
  actualValue     Float
  achievementPct  Float     // (actual / target) * 100
  recordedAt      DateTime  @default(now())

  assignment      PerfKPIAssignment @relation(fields: [assignmentId], references: [id], onDelete: Cascade)

  @@map("perf_kpi_results")
}

// --- Continuous Feedback ---

model PerfFeedback {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  fromEmployeeId  String    @db.Uuid
  toEmployeeId    String    @db.Uuid
  category        String    // Appreciation, Coaching, Improvement, Achievement, Innovation, Leadership, Collaboration
  content         String
  isAnonymous     Boolean   @default(false)
  createdAt       DateTime  @default(now())

  @@map("perf_feedback")
}

model PerfRecognition {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  fromEmployeeId  String    @db.Uuid
  toEmployeeId    String    @db.Uuid
  badge           String?   // Star Performer, Team Player, Innovator
  message         String
  createdAt       DateTime  @default(now())

  @@map("perf_recognitions")
}

// --- Development ---

model PerfDevelopmentPlan {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  cycleId         String?   @db.Uuid
  status          String    @default("Active") // Active, Completed, Archived

  goals           PerfDevelopmentGoal[]

  @@map("perf_development_plans")
}

model PerfDevelopmentGoal {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  planId          String    @db.Uuid
  title           String
  targetDate      DateTime? @db.Date
  status          String    @default("NotStarted") // NotStarted, InProgress, Completed

  plan            PerfDevelopmentPlan @relation(fields: [planId], references: [id], onDelete: Cascade)
  activities      PerfDevelopmentActivity[]

  @@map("perf_development_goals")
}

model PerfDevelopmentActivity {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  goalId          String    @db.Uuid
  activityType    String    // Training, Mentoring, StretchAssignment, Certification, Reading
  description     String
  isCompleted     Boolean   @default(false)

  goal            PerfDevelopmentGoal @relation(fields: [goalId], references: [id], onDelete: Cascade)

  @@map("perf_development_activities")
}

// --- Succession & 9-Box ---

model PerfSuccessionCandidate {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  targetPositionId String   @db.Uuid
  readinessLevel  String    // Ready, ReadyIn1Year, ReadyIn2Years, Development

  @@map("perf_succession_candidates")
}

model PerfTalentPool {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  name            String    // High Performers, Leadership Pipeline, Technical Experts
  description     String?

  @@map("perf_talent_pools")
}

model PerfReadinessAssessment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  candidateId     String    @db.Uuid
  assessedBy      String    @db.Uuid
  score           Float
  notes           String?
  assessedAt      DateTime  @default(now())

  @@map("perf_readiness_assessments")
}

model PerfPotentialAssessment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  cycleId         String    @db.Uuid
  potentialScore  Float     // 1-5 or custom
  assessedBy      String    @db.Uuid
  assessedAt      DateTime  @default(now())

  @@map("perf_potential_assessments")
}

model PerfNineBoxPlacement {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  cycleId         String    @db.Uuid
  performanceScore Float    // From PerfRating
  potentialScore  Float     // From PerfPotentialAssessment
  boxLabel        String    // "Star", "High Performer", "Core Player", "Under Performer", etc.

  @@map("perf_nine_box_placements")
}

// --- Bonus Recommendation ---

model PerfBonusRecommendation {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  employeeId      String    @db.Uuid
  cycleId         String    @db.Uuid
  ratingId        String    @db.Uuid
  recommendedPct  Float     // e.g. 15% of CTC
  status          String    @default("Pending") // Pending, Approved, Published

  @@map("perf_bonus_recommendations")
}

// --- Snapshot ---

model PerfPerformanceSnapshot {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  cycleId         String    @db.Uuid
  employeeId      String    @db.Uuid
  snapshotData    Json      // Employee, Manager, Position, Goals, Competencies, Attendance, Leave, RatingScale, RulesVersion

  cycle           PerfPerformanceCycle @relation(fields: [cycleId], references: [id], onDelete: Cascade)

  @@map("perf_performance_snapshots")
}

// --- Timeline ---

model PerfPerformanceTimeline {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  cycleId         String?   @db.Uuid
  employeeId      String?   @db.Uuid
  eventType       String    // GoalAssigned, SelfReviewSubmitted, CalibrationCompleted, PerformanceFinalized, etc.
  eventData       Json?
  occurredAt      DateTime  @default(now())

  @@map("perf_performance_timeline")
}
`;

if (!schemaContent.includes('model PerfPerformanceCycle {')) {
  schemaContent += '\\n' + perfSchema;
  fs.writeFileSync(schemaPath, schemaContent, 'utf8');
  console.log('Phase 5.7 Performance Schema appended successfully.');
} else {
  console.log('Performance schema already exists.');
}
