const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf-8');

const NEW_MODELS = `

// ==========================================
// WORKFLOW ENGINE (PHASE 4)
// ==========================================

model WorkflowDefinition {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  
  name        String @unique
  description String?
  entityType  String // e.g., 'LeaveRequest'

  versions WorkflowVersion[]

  @@map("workflow_definitions")
}

model WorkflowVersion {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  definitionId String @db.Uuid
  version      Int
  isActive     Boolean @default(false)
  
  definition WorkflowDefinition @relation(fields: [definitionId], references: [id], onDelete: Cascade)
  states     WorkflowState[]
  transitions WorkflowTransition[]
  instances  WorkflowInstance[]

  @@unique([definitionId, version])
  @@map("workflow_versions")
}

model WorkflowState {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  versionId String @db.Uuid
  name      String // e.g., 'Draft', 'Pending Manager Approval'
  type      String // e.g., 'START', 'INTERMEDIATE', 'END', 'CANCELLED'

  version WorkflowVersion @relation(fields: [versionId], references: [id], onDelete: Cascade)

  fromTransitions WorkflowTransition[] @relation("FromState")
  toTransitions   WorkflowTransition[] @relation("ToState")
  instances       WorkflowInstance[]

  @@map("workflow_states")
}

model WorkflowTransition {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  versionId String @db.Uuid
  fromStateId String @db.Uuid
  toStateId   String @db.Uuid
  name        String // e.g., 'Approve', 'Reject'

  version   WorkflowVersion @relation(fields: [versionId], references: [id], onDelete: Cascade)
  fromState WorkflowState   @relation("FromState", fields: [fromStateId], references: [id], onDelete: Cascade)
  toState   WorkflowState   @relation("ToState", fields: [toStateId], references: [id], onDelete: Cascade)
  
  conditions WorkflowCondition[]
  actions    WorkflowAction[]

  @@map("workflow_transitions")
}

model WorkflowCondition {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  transitionId String @db.Uuid
  field        String
  operator     String
  value        String

  transition WorkflowTransition @relation(fields: [transitionId], references: [id], onDelete: Cascade)

  @@map("workflow_conditions")
}

model WorkflowAction {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  transitionId String @db.Uuid
  actionType   String // SEND_EMAIL, PUBLISH_EVENT, UPDATE_RECORD
  payload      Json

  transition WorkflowTransition @relation(fields: [transitionId], references: [id], onDelete: Cascade)

  @@map("workflow_actions")
}

model WorkflowInstance {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  versionId    String @db.Uuid
  currentStateId String @db.Uuid
  entityId     String @db.Uuid
  status       String // IN_PROGRESS, COMPLETED, CANCELLED

  version      WorkflowVersion @relation(fields: [versionId], references: [id], onDelete: Restrict)
  currentState WorkflowState   @relation(fields: [currentStateId], references: [id], onDelete: Restrict)
  
  tasks WorkflowTask[]

  @@map("workflow_instances")
}

model WorkflowTask {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  instanceId String @db.Uuid
  assigneeId String? @db.Uuid // User Id
  roleId     String? @db.Uuid // Role Id
  status     String // PENDING, COMPLETED, REJECTED
  dueDate    DateTime?

  instance WorkflowInstance @relation(fields: [instanceId], references: [id], onDelete: Cascade)
  histories WorkflowTaskHistory[]
  comments  WorkflowComment[]

  @@map("workflow_tasks")
}

model WorkflowTaskHistory {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())

  taskId    String @db.Uuid
  action    String
  actorId   String @db.Uuid

  task WorkflowTask @relation(fields: [taskId], references: [id], onDelete: Cascade)

  @@map("workflow_task_histories")
}

model WorkflowComment {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())

  taskId    String @db.Uuid
  userId    String @db.Uuid
  content   String

  task WorkflowTask @relation(fields: [taskId], references: [id], onDelete: Cascade)

  @@map("workflow_comments")
}

// ==========================================
// BUSINESS CALENDAR ENGINE
// ==========================================

model BusinessCalendar {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  name           String @unique
  organizationId String @db.Uuid
  timezone       String

  workingHours WorkingHour[]
  exceptions   CalendarException[]

  @@map("business_calendars")
}

model WorkingHour {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  calendarId String @db.Uuid
  dayOfWeek  Int // 0 = Sunday, 1 = Monday
  startTime  String // "09:00"
  endTime    String // "17:00"
  isWorking  Boolean @default(true)

  calendar BusinessCalendar @relation(fields: [calendarId], references: [id], onDelete: Cascade)

  @@map("working_hours")
}

model CalendarException {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  calendarId String @db.Uuid
  date       DateTime @db.Date
  reason     String
  isWorking  Boolean @default(false)

  calendar BusinessCalendar @relation(fields: [calendarId], references: [id], onDelete: Cascade)

  @@map("calendar_exceptions")
}

// ==========================================
// FORM ENGINE
// ==========================================

model FormDefinition {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  name        String @unique
  description String?
  isActive    Boolean @default(true)

  fields      FormField[]
  submissions FormSubmission[]

  @@map("form_definitions")
}

model FormField {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  formId    String @db.Uuid
  name      String
  type      String // TEXT, NUMBER, DATE, SELECT, CHECKBOX
  order     Int
  required  Boolean @default(false)

  form       FormDefinition @relation(fields: [formId], references: [id], onDelete: Cascade)
  validations FieldValidation[]
  options     FieldOption[]

  @@map("form_fields")
}

model FieldValidation {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())

  fieldId String @db.Uuid
  rule    String // MIN, MAX, REGEX
  value   String
  message String?

  field FormField @relation(fields: [fieldId], references: [id], onDelete: Cascade)

  @@map("field_validations")
}

model FieldOption {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())

  fieldId String @db.Uuid
  label   String
  value   String

  field FormField @relation(fields: [fieldId], references: [id], onDelete: Cascade)

  @@map("field_options")
}

model FormSubmission {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  formId      String @db.Uuid
  submitterId String? @db.Uuid // Optional, can be anonymous
  data        Json

  form FormDefinition @relation(fields: [formId], references: [id], onDelete: Cascade)

  @@map("form_submissions")
}

// ==========================================
// REPORT ENGINE
// ==========================================

model ReportTemplate {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  name        String @unique
  description String?
  baseQuery   String // The root entity or raw query identifier

  filters ReportFilter[]

  @@map("report_templates")
}

model ReportFilter {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())

  templateId String @db.Uuid
  field      String
  operator   String
  defaultValue String?

  template ReportTemplate @relation(fields: [templateId], references: [id], onDelete: Cascade)

  @@map("report_filters")
}

// ==========================================
// INTEGRATION FRAMEWORK
// ==========================================

model IntegrationProvider {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  name      String @unique
  type      String // WEBHOOK, API_KEY, OAUTH
  config    Json

  webhooks IntegrationWebhook[]

  @@map("integration_providers")
}

model IntegrationWebhook {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  providerId String @db.Uuid
  url        String
  events     String[] // e.g., ['EmployeeCreated', 'LeaveApproved']

  provider IntegrationProvider @relation(fields: [providerId], references: [id], onDelete: Cascade)

  @@map("integration_webhooks")
}

// ==========================================
// TEMPLATES & BUSINESS RULES
// ==========================================

model Template {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  name String @unique
  type String // EMAIL, PDF, SMS
  
  versions TemplateVersion[]

  @@map("templates")
}

model TemplateVersion {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  templateId String @db.Uuid
  version    Int
  content    String // Contains placeholders like {{employee.name}}
  isActive   Boolean @default(false)

  template Template @relation(fields: [templateId], references: [id], onDelete: Cascade)

  @@map("template_versions")
}

model BusinessRuleSet {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  name        String @unique
  entityType  String // e.g., 'LeavePolicy'

  rules BusinessRule[]

  @@map("business_rule_sets")
}

model BusinessRule {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  ruleSetId String @db.Uuid
  priority  Int
  
  ruleSet BusinessRuleSet @relation(fields: [ruleSetId], references: [id], onDelete: Cascade)

  conditions RuleCondition[]
  actions    RuleAction[]

  @@map("business_rules")
}

model RuleCondition {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())

  ruleId   String @db.Uuid
  field    String
  operator String
  value    String

  rule BusinessRule @relation(fields: [ruleId], references: [id], onDelete: Cascade)

  @@map("rule_conditions")
}

model RuleAction {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())

  ruleId   String @db.Uuid
  field    String
  value    String

  rule BusinessRule @relation(fields: [ruleId], references: [id], onDelete: Cascade)

  @@map("rule_actions")
}

// ==========================================
// STORAGE & MODULE REGISTRY
// ==========================================

model FileRecord {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  filename   String
  mimeType   String
  size       Int
  provider   String // LOCAL, S3
  pathOrKey  String
  checksum   String?
  ownerId    String? @db.Uuid // User Id

  @@map("file_records")
}

model ModuleDependency {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())

  moduleId           String @db.Uuid
  dependsOnModuleId  String @db.Uuid

  @@map("module_dependencies")
}

model ModuleLicense {
  id        String    @id @default(uuid()) @db.Uuid
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  organizationId String @db.Uuid
  moduleId       String @db.Uuid
  validUntil     DateTime?

  @@map("module_licenses")
}

`;

if (!schema.includes('model WorkflowDefinition')) {
    schema += NEW_MODELS;
}

fs.writeFileSync(schemaPath, schema);
console.log('Appended Phase 4 Platform tables to schema.');
