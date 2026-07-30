const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

// ==========================================
// TEMPLATE & DOCUMENT PLATFORM
// ==========================================

model Template {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  description     String?
  type            String   // HTML, TEXT, PDF, DOCX
  isPartial       Boolean  @default(false)
  
  versions        TemplateVersion[]

  @@map("templates")
}

model TemplateVersion {
  id              String   @id @default(uuid()) @db.Uuid
  templateId      String   @db.Uuid
  version         Int
  status          String   @default("DRAFT") // DRAFT, PUBLISHED, ARCHIVED
  
  content         String   // Handlebars content
  schema          Json?    // Extracted variables
  
  template        Template @relation(fields: [templateId], references: [id], onDelete: Cascade)

  @@unique([templateId, version])
  @@map("template_versions")
}

model TemplateLocalization {
  id              String   @id @default(uuid()) @db.Uuid
  templateId      String   @db.Uuid
  version         Int
  locale          String   // fr-FR
  content         String
  
  @@unique([templateId, version, locale])
  @@map("template_localizations")
}

model TemplateAsset {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  storageRef      String   // Pointer to Storage Engine
  type            String   // LOGO, SIGNATURE, WATERMARK
  
  @@map("template_assets")
}

model RenderProfile {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  renderer        String   // PUPPETEER, HTML, DOCX
  config          Json     // { margins, landscape, format, scale }
  
  @@map("render_profiles")
}

model TemplateTestData {
  id              String   @id @default(uuid()) @db.Uuid
  templateId      String   @db.Uuid
  name            String
  payload         Json     // Reusable JSON for previews
  
  @@map("template_test_data")
}

model TemplateRender {
  id              String   @id @default(uuid()) @db.Uuid
  templateId      String   @db.Uuid
  version         Int
  profileCode     String?
  
  variablesUsed   Json     // Audit snapshot
  format          String   // PDF, HTML
  durationMs      Int
  status          String   // SUCCESS, FAILED
  errorMessage    String?
  
  executedBy      String?  @db.Uuid
  executedAt      DateTime @default(now())
  
  @@map("template_renders")
}

`;

if (!schema.includes('model Template {')) {
  schema += newModels;
  fs.writeFileSync(schemaPath, schema);
  console.log('Template schemas appended successfully.');
} else {
  console.log('Template schemas already exist.');
}
