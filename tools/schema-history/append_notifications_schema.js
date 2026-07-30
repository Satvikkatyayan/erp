const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

// ==========================================
// NOTIFICATION PLATFORM
// ==========================================

model NotificationTemplate {
  id          String   @id @default(uuid()) @db.Uuid
  code        String   @unique
  name        String
  description String?
  channel     String   // EMAIL, SMS, IN_APP, PUSH, SLACK
  active      Boolean  @default(true)
  
  versions    NotificationTemplateVersion[]

  @@map("notification_templates")
}

model NotificationTemplateVersion {
  id          String   @id @default(uuid()) @db.Uuid
  templateId  String   @db.Uuid
  version     Int
  status      String   @default("DRAFT") // DRAFT, PUBLISHED, ARCHIVED
  
  subject     String?
  body        String   // Handlebars content
  language    String   @default("en-US")
  
  template    NotificationTemplate @relation(fields: [templateId], references: [id], onDelete: Cascade)

  @@unique([templateId, version, language])
  @@map("notification_template_versions")
}

model NotificationRoutingRule {
  id          String   @id @default(uuid()) @db.Uuid
  eventKey    String   @unique // e.g., LEAVE_APPROVED
  config      Json     // Array of resolution strategies
  active      Boolean  @default(true)
  
  @@map("notification_routing_rules")
}

model NotificationPreference {
  id              String   @id @default(uuid()) @db.Uuid
  userId          String   @unique @db.Uuid
  mutedChannels   Json?    // ["SMS", "PUSH"]
  quietHoursStart String?  // "22:00"
  quietHoursEnd   String?  // "08:00"
  tz              String   @default("UTC")
  
  @@map("notification_preferences")
}

model Notification {
  id            String   @id @default(uuid()) @db.Uuid
  recipientId   String   @db.Uuid
  templateCode  String
  priority      String   @default("NORMAL") // LOW, NORMAL, HIGH, URGENT, CRITICAL
  status        String   @default("PENDING") // PENDING, QUEUED, SENT, FAILED, EXPIRED
  
  subject       String?
  body          String
  channel       String
  attachments   Json?    // Array of file storage refs
  
  expiresAt     DateTime?
  sentAt        DateTime?
  readAt        DateTime?
  dismissedAt   DateTime?
  
  retryCount    Int      @default(0)
  errorMessage  String?

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@map("notifications")
}

model NotificationDigest {
  id            String   @id @default(uuid()) @db.Uuid
  recipientId   String   @db.Uuid
  frequency     String   // DAILY, WEEKLY
  nextRun       DateTime
  notifications Json     // Pending notification IDs
  
  @@map("notification_digests")
}

`;

if (!schema.includes('model NotificationTemplate')) {
  schema += newModels;
  fs.writeFileSync(schemaPath, schema);
  console.log('Notification schemas appended successfully.');
} else {
  console.log('Notification schemas already exist.');
}
