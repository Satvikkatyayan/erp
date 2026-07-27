const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

// ==========================================
// ENTERPRISE DYNAMIC FORMS PLATFORM
// ==========================================

model FormTemplate {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique // leave_request_template
  name            String
  description     String?
  
  defaultSchema   Json     // Baseline structural layout
  
  @@map("form_templates")
}

model Form {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  organizationId  String?  @db.Uuid
  templateId      String?  @db.Uuid
  
  activeVersionId String?  @db.Uuid
  
  versions        FormVersion[]
  template        FormTemplate? @relation(fields: [templateId], references: [id])

  @@map("forms")
}

model FormVersion {
  id              String   @id @default(uuid()) @db.Uuid
  formId          String   @db.Uuid
  version         Int
  status          String   @default("DRAFT") // DRAFT, PUBLISHED, ARCHIVED
  
  layoutMetadata  Json     // Grid, Row, Accordion structuring
  
  sections        FormSection[]
  form            Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
  
  @@unique([formId, version])
  @@map("form_versions")
}

model FormSection {
  id              String   @id @default(uuid()) @db.Uuid
  versionId       String   @db.Uuid
  
  code            String
  titleKey        String   // i18n localization key
  order           Int
  isRepeatable    Boolean  @default(false)
  
  fields          FormField[]
  version         FormVersion @relation(fields: [versionId], references: [id], onDelete: Cascade)
  
  @@map("form_sections")
}

model FormField {
  id              String   @id @default(uuid()) @db.Uuid
  sectionId       String   @db.Uuid
  
  code            String
  type            String   // TEXT, NUMBER, CURRENCY, FILE, GROUP
  order           Int
  
  labelKey        String   // i18n
  helpTextKey     String?  // i18n
  
  accessibility   Json?    // ariaLabel, roles
  config          Json?    // defaultValue, multiSelect
  
  validations     FormValidation[]
  conditions      FormCondition[]
  
  section         FormSection @relation(fields: [sectionId], references: [id], onDelete: Cascade)
  
  @@map("form_fields")
}

model FormValidation {
  id              String   @id @default(uuid()) @db.Uuid
  fieldId         String   @db.Uuid
  
  rule            String   // MIN, MAX, REGEX, REQUIRED, CUSTOM
  expected        String
  messageKey      String   // i18n validation error
  
  field           FormField @relation(fields: [fieldId], references: [id], onDelete: Cascade)
  
  @@map("form_validations")
}

model FormCondition {
  id              String   @id @default(uuid()) @db.Uuid
  fieldId         String   @db.Uuid
  
  type            String   // VISIBILITY, REQUIRED, CALCULATED
  expressionAst   Json     // The AST executed via RuleEvaluationAdapter
  
  field           FormField @relation(fields: [fieldId], references: [id], onDelete: Cascade)
  
  @@map("form_conditions")
}

model FormSubmission {
  id              String   @id @default(uuid()) @db.Uuid
  formId          String   @db.Uuid
  
  submittedBy     String?  @db.Uuid
  status          String   @default("DRAFT") // DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED
  workflowId      String?  @db.Uuid          // Link to Stage 1 workflow execution
  
  versions        FormSubmissionVersion[]
  attachments     FormAttachment[]
  
  @@map("form_submissions")
}

model FormSubmissionVersion {
  id              String   @id @default(uuid()) @db.Uuid
  submissionId    String   @db.Uuid
  version         Int
  
  payload         Json     // Autosave/Submitted data dump
  
  createdAt       DateTime @default(now())
  
  submission      FormSubmission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  
  @@map("form_submission_versions")
}

model FormAttachment {
  id              String   @id @default(uuid()) @db.Uuid
  submissionId    String   @db.Uuid
  fieldCode       String
  
  storageObjectId String   @db.Uuid // Reference to Stage 7 Storage Engine
  fileName        String
  mimeType        String
  
  submission      FormSubmission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  
  @@map("form_attachments")
}

model FormLocalization {
  id              String   @id @default(uuid()) @db.Uuid
  locale          String   // en-US, fr-FR
  resourceKey     String   // form.leave.salary.label
  value           String   // "Salary"
  
  @@unique([locale, resourceKey])
  @@map("form_localizations")
}

`;

if (!schema.includes('model FormTemplate {')) {
  schema += newModels;
  fs.writeFileSync(schemaPath, schema);
  console.log('Forms schemas appended successfully.');
} else {
  console.log('Forms schemas already exist.');
}
