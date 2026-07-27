const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

const recSchema = `
// ==========================================
// RECRUITMENT MANAGEMENT MODULE (PHASE 5.3)
// ==========================================

model RecPosition {
  id             String @id @default(uuid()) @db.Uuid
  tenantId       String @db.Uuid
  organizationId String @db.Uuid
  departmentId   String @db.Uuid
  designationId  String @db.Uuid

  code              String
  title             String
  approvedHeadcount Int
  filled            Int @default(0)

  vacancies         RecVacancy[]
  requisitions      RecJobRequisition[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  updatedBy String?

  @@unique([tenantId, code])
  @@map("rec_positions")
}

model RecVacancy {
  id             String @id @default(uuid()) @db.Uuid
  tenantId       String @db.Uuid
  organizationId String @db.Uuid
  positionId     String @db.Uuid

  code         String
  status       String @default("OPEN") // OPEN, IN_PROGRESS, FILLED, CANCELLED
  reason       String? // NEW_HIRE, REPLACEMENT

  position     RecPosition @relation(fields: [positionId], references: [id])
  requisition  RecJobRequisition?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  updatedBy String?

  @@unique([tenantId, code])
  @@map("rec_vacancies")
}

model RecHiringRequest {
  id             String @id @default(uuid()) @db.Uuid
  tenantId       String @db.Uuid
  organizationId String @db.Uuid

  title          String
  departmentId   String @db.Uuid
  requestedBy    String
  budget         Float?
  status         String @default("DRAFT") // DRAFT, PENDING_APPROVAL, APPROVED, REJECTED

  requisitions   RecJobRequisition[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  updatedBy String?

  @@map("rec_hiring_requests")
}

model RecJobRequisition {
  id               String @id @default(uuid()) @db.Uuid
  tenantId         String @db.Uuid
  organizationId   String @db.Uuid
  positionId       String @db.Uuid
  vacancyId        String? @db.Uuid @unique
  hiringRequestId  String? @db.Uuid

  code             String
  title            String
  description      String
  salaryMin        Float?
  salaryMax        Float?
  currency         String?
  status           String @default("DRAFT") // DRAFT, PUBLISHED, CLOSED, CANCELLED
  hiringManagerId  String?
  recruiterId      String?

  position         RecPosition @relation(fields: [positionId], references: [id])
  vacancy          RecVacancy? @relation(fields: [vacancyId], references: [id])
  hiringRequest    RecHiringRequest? @relation(fields: [hiringRequestId], references: [id])

  requiredSkills   RecRequiredSkill[]
  applications     RecCandidateApplication[]
  interviews       RecInterview[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  updatedBy String?

  @@unique([tenantId, code])
  @@map("rec_job_requisitions")
}

model RecRequiredSkill {
  id               String @id @default(uuid()) @db.Uuid
  requisitionId    String @db.Uuid
  skillName        String
  proficiency      String // BASIC, INTERMEDIATE, EXPERT
  isMandatory      Boolean @default(false)

  requisition      RecJobRequisition @relation(fields: [requisitionId], references: [id])

  @@map("rec_required_skills")
}

model RecCandidateSource {
  id             String @id @default(uuid()) @db.Uuid
  tenantId       String @db.Uuid
  name           String // LinkedIn, Referral, etc.
  category       String // SOCIAL, INTERNAL, AGENCY

  candidates     RecCandidate[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([tenantId, name])
  @@map("rec_candidate_sources")
}

model RecTalentPool {
  id             String @id @default(uuid()) @db.Uuid
  tenantId       String @db.Uuid
  name           String // Java Developers, Campus 2027
  description    String?

  members        RecTalentPoolMember[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([tenantId, name])
  @@map("rec_talent_pools")
}

model RecTalentPoolMember {
  id             String @id @default(uuid()) @db.Uuid
  poolId         String @db.Uuid
  candidateId    String @db.Uuid

  pool           RecTalentPool @relation(fields: [poolId], references: [id])
  candidate      RecCandidate  @relation(fields: [candidateId], references: [id])

  addedAt DateTime @default(now())
  
  @@unique([poolId, candidateId])
  @@map("rec_talent_pool_members")
}

model RecRecruitmentAgency {
  id             String @id @default(uuid()) @db.Uuid
  tenantId       String @db.Uuid
  name           String
  contactEmail   String?
  contactPhone   String?
  status         String @default("ACTIVE")

  candidates     RecCandidate[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("rec_recruitment_agencies")
}

model RecCandidate {
  id             String @id @default(uuid()) @db.Uuid
  tenantId       String @db.Uuid
  
  firstName      String
  lastName       String
  email          String
  phone          String?
  sourceId       String? @db.Uuid
  agencyId       String? @db.Uuid

  source         RecCandidateSource? @relation(fields: [sourceId], references: [id])
  agency         RecRecruitmentAgency? @relation(fields: [agencyId], references: [id])

  applications   RecCandidateApplication[]
  poolMemberships RecTalentPoolMember[]
  documents      RecCandidateDocument[]
  communications RecCandidateCommunication[]
  consents       RecCandidateConsent[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  updatedBy String?

  @@unique([tenantId, email])
  @@map("rec_candidates")
}

model RecCandidateDocument {
  id             String @id @default(uuid()) @db.Uuid
  candidateId    String @db.Uuid
  documentType   String // RESUME, PORTFOLIO, CERTIFICATE
  fileUrl        String

  candidate      RecCandidate @relation(fields: [candidateId], references: [id])

  createdAt DateTime @default(now())
  @@map("rec_candidate_documents")
}

model RecCandidateConsent {
  id             String @id @default(uuid()) @db.Uuid
  candidateId    String @db.Uuid
  consentType    String // DATA_PROCESSING, RESUME_RETENTION
  isGranted      Boolean @default(true)
  expiryDate     DateTime?

  candidate      RecCandidate @relation(fields: [candidateId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("rec_candidate_consents")
}

model RecCandidateCommunication {
  id             String @id @default(uuid()) @db.Uuid
  candidateId    String @db.Uuid
  channel        String // EMAIL, SMS, WHATSAPP, CALL
  subject        String?
  notes          String?
  direction      String // INBOUND, OUTBOUND

  candidate      RecCandidate @relation(fields: [candidateId], references: [id])

  communicatedAt DateTime @default(now())
  @@map("rec_candidate_communications")
}

model RecCandidateApplication {
  id               String @id @default(uuid()) @db.Uuid
  tenantId         String @db.Uuid
  candidateId      String @db.Uuid
  requisitionId    String @db.Uuid

  status           String @default("APPLIED") // APPLIED, SCREENING, SHORTLISTED, INTERVIEWING, SELECTED, OFFER_PENDING, OFFER_SENT, OFFER_ACCEPTED, BACKGROUND_VERIFICATION, ONBOARDING, EMPLOYEE_CREATED, CLOSED

  candidate        RecCandidate @relation(fields: [candidateId], references: [id])
  requisition      RecJobRequisition @relation(fields: [requisitionId], references: [id])

  interviews       RecInterview[]
  offers           RecOffer[]
  assessments      RecAssessmentInvitation[]
  bgVerifications  RecBackgroundVerification[]
  timelines        RecRecruitmentTimeline[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  updatedBy String?

  @@unique([candidateId, requisitionId])
  @@map("rec_candidate_applications")
}

model RecAssessmentInvitation {
  id               String @id @default(uuid()) @db.Uuid
  applicationId    String @db.Uuid
  provider         String // HACKERRANK, CODILITY
  assessmentName   String
  status           String @default("INVITED") // INVITED, COMPLETED, EXPIRED
  score            Float?
  feedback         String?

  application      RecCandidateApplication @relation(fields: [applicationId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("rec_assessment_invitations")
}

model RecInterview {
  id               String @id @default(uuid()) @db.Uuid
  tenantId         String @db.Uuid
  applicationId    String @db.Uuid
  requisitionId    String @db.Uuid

  title            String
  roundNumber      Int
  scheduledAt      DateTime
  durationMinutes  Int
  status           String @default("SCHEDULED") // SCHEDULED, COMPLETED, CANCELLED, NO_SHOW
  
  application      RecCandidateApplication @relation(fields: [applicationId], references: [id])
  requisition      RecJobRequisition @relation(fields: [requisitionId], references: [id])

  feedbacks        RecInterviewFeedback[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  updatedBy String?

  @@map("rec_interviews")
}

model RecInterviewFeedback {
  id               String @id @default(uuid()) @db.Uuid
  interviewId      String @db.Uuid
  interviewerId    String
  formInstanceId   String? // References Forms SDK
  overallScore     Float?
  recommendation   String // HIRE, NO_HIRE, HOLD
  notes            String?

  interview        RecInterview @relation(fields: [interviewId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("rec_interview_feedbacks")
}

model RecOffer {
  id               String @id @default(uuid()) @db.Uuid
  tenantId         String @db.Uuid
  applicationId    String @db.Uuid
  
  version          Int @default(1)
  baseSalary       Float
  bonus            Float?
  currency         String
  validUntil       DateTime
  status           String @default("DRAFT") // DRAFT, PENDING_APPROVAL, APPROVED, SENT, NEGOTIATING, ACCEPTED, REJECTED, WITHDRAWN
  documentUrl      String?

  application      RecCandidateApplication @relation(fields: [applicationId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  updatedBy String?

  @@unique([applicationId, version])
  @@map("rec_offers")
}

model RecBackgroundVerification {
  id               String @id @default(uuid()) @db.Uuid
  tenantId         String @db.Uuid
  applicationId    String @db.Uuid

  vendorName       String
  status           String @default("REQUESTED") // REQUESTED, IN_PROGRESS, VERIFIED, DISCREPANCY, FAILED
  reportUrl        String?
  notes            String?

  application      RecCandidateApplication @relation(fields: [applicationId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  updatedBy String?

  @@map("rec_background_verifications")
}

model RecRecruitmentTimeline {
  id               String @id @default(uuid()) @db.Uuid
  tenantId         String @db.Uuid
  applicationId    String @db.Uuid

  eventType        String // APPLIED, INTERVIEW_SCHEDULED, OFFER_SENT, OFFER_ACCEPTED, EMPLOYEE_CREATED, REJECTED
  description      String?
  actorId          String? // System or UserId

  application      RecCandidateApplication @relation(fields: [applicationId], references: [id])

  recordedAt DateTime @default(now())

  @@map("rec_recruitment_timelines")
}

model RecRecruitmentSnapshot {
  id               String @id @default(uuid()) @db.Uuid
  tenantId         String @db.Uuid
  organizationId   String @db.Uuid

  activeRequisitions Int
  totalApplications  Int
  offersAccepted     Int
  timeToHireAvgDays  Float?

  generatedAt DateTime @default(now())

  @@map("rec_recruitment_snapshots")
}

`;

if (!schema.includes('RecJobRequisition')) {
  schema += '\n' + recSchema;
  fs.writeFileSync(schemaPath, schema, 'utf8');
  console.log('Recruitment schema appended successfully.');
} else {
  console.log('Recruitment schema already exists.');
}
