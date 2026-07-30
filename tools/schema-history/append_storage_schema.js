const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

// ==========================================
// ENTERPRISE STORAGE PLATFORM
// ==========================================

model StorageProvider {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique // S3_DEFAULT, LOCAL_DISK
  type            String   // S3, LOCAL, AZURE
  config          Json     // Connection credentials
  active          Boolean  @default(true)
  
  buckets         StorageBucket[]

  @@map("storage_providers")
}

model StorageBucket {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique // hr-documents, avatars
  name            String
  providerId      String   @db.Uuid
  
  provider        StorageProvider @relation(fields: [providerId], references: [id])
  objects         StorageObject[]

  @@map("storage_buckets")
}

model StorageObject {
  id              String   @id @default(uuid()) @db.Uuid
  bucketId        String   @db.Uuid
  key             String   // virtual path e.g. users/123/avatar.jpg
  
  activeVersionId String?  @db.Uuid // Points to latest StorageObjectVersion
  
  bucket          StorageBucket @relation(fields: [bucketId], references: [id])
  versions        StorageObjectVersion[]

  @@unique([bucketId, key])
  @@map("storage_objects")
}

model StorageObjectVersion {
  id              String   @id @default(uuid()) @db.Uuid
  objectId        String   @db.Uuid
  version         Int
  
  storageClass    String   @default("STANDARD") // STANDARD, ARCHIVE, GLACIER
  mimeType        String
  sizeBytes       BigInt
  checksum        String   // SHA256 for CAS duplicate detection
  
  metadata        Json?    // Custom searchable tags
  encryptionKeyId String?  // Reference for KMS
  
  status          String   @default("UPLOADED") // UPLOADED, SCANNING, PUBLISHED, ARCHIVED
  
  createdAt       DateTime @default(now())
  
  object          StorageObject @relation(fields: [objectId], references: [id], onDelete: Cascade)
  
  @@unique([objectId, version])
  @@map("storage_object_versions")
}

model StorageQuota {
  id              String   @id @default(uuid()) @db.Uuid
  targetId        String   @db.Uuid // OrgId or UserId
  targetType      String   // ORGANIZATION, USER
  
  maxBytes        BigInt
  usedBytes       BigInt   @default(0)
  maxFiles        Int?
  
  @@unique([targetId, targetType])
  @@map("storage_quotas")
}

model StorageShare {
  id              String   @id @default(uuid()) @db.Uuid
  objectVersionId String   @db.Uuid
  
  token           String   @unique
  expiresAt       DateTime?
  maxDownloads    Int?
  downloadCount   Int      @default(0)
  
  @@map("storage_shares")
}

model StorageLifecyclePolicy {
  id              String   @id @default(uuid()) @db.Uuid
  bucketId        String?  @db.Uuid
  ruleCode        String   @unique // ARCHIVE_AFTER_2_YEARS
  config          Json
  
  @@map("storage_lifecycle_policies")
}

`;

if (!schema.includes('model StorageBucket {')) {
  schema += newModels;
  fs.writeFileSync(schemaPath, schema);
  console.log('Storage schemas appended successfully.');
} else {
  console.log('Storage schemas already exist.');
}
