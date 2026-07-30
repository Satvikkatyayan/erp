const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf-8');

const NEW_MODELS = `

// ==========================================
// OUTBOX PATTERN & MESSAGING
// ==========================================

model OutboxMessage {
  id            String    @id @default(uuid()) @db.Uuid
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  eventName     String
  aggregateType String?
  aggregateId   String?
  payload       Json
  
  state         String    @default("PENDING") // PENDING, PROCESSING, PROCESSED, FAILED, DEAD_LETTER
  
  correlationId String?
  causationId   String?
  
  lockedAt      DateTime?
  lockedBy      String?
  
  error         String?
  retryCount    Int       @default(0)
  nextRetryAt   DateTime?
  
  @@index([state, nextRetryAt])
  @@map("outbox_messages")
}
`;

if (!schema.includes('model OutboxMessage')) {
    schema += NEW_MODELS;
    fs.writeFileSync(schemaPath, schema);
    console.log('Appended OutboxMessage table to schema.');
} else {
    console.log('OutboxMessage already exists.');
}
