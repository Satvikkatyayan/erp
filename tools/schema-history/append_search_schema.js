const fs = require('fs');
const path = require('path');

const schemaPath = 'd:\\erpvvinfratech\\prisma\\schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

// ==========================================
// ENTERPRISE SEARCH PLATFORM
// ==========================================

model SearchIndex {
  id              String   @id @default(uuid()) @db.Uuid
  name            String   @unique // employees, templates, documents
  version         Int      @default(1)
  
  description     String?
  active          Boolean  @default(true)
  
  mappings        SearchMapping[]
  documents       SearchDocument[]

  @@map("search_indices")
}

model SearchAlias {
  id              String   @id @default(uuid()) @db.Uuid
  aliasName       String   @unique
  targetIndexName String
  
  @@map("search_aliases")
}

model SearchMapping {
  id              String   @id @default(uuid()) @db.Uuid
  indexId         String   @db.Uuid
  
  fieldName       String
  weight          String   @default("A") // A, B, C, D (for Postgres TSVECTOR)
  isFacetable     Boolean  @default(false)
  isFilterable    Boolean  @default(false)
  
  index           SearchIndex @relation(fields: [indexId], references: [id])

  @@unique([indexId, fieldName])
  @@map("search_mappings")
}

model SearchDocument {
  id              String   @id @default(uuid()) @db.Uuid
  indexId         String   @db.Uuid
  
  entityType      String
  entityId        String
  organizationId  String   @db.Uuid
  
  searchableText  String
  metadata        Json     // JSONB
  tsvector        Unsupported("tsvector")?
  
  rankingData     Json?
  securityData    Json?    // Permissions, Roles, Owner
  
  indexedAt       DateTime @default(now())
  version         Int      @default(1)
  
  index           SearchIndex @relation(fields: [indexId], references: [id], onDelete: Cascade)

  @@unique([indexId, entityType, entityId])
  @@index([organizationId])
  // NOTE: Actual GIN index for tsvector is applied via raw SQL migration
  @@map("search_documents")
}

model SearchSynonym {
  id              String   @id @default(uuid()) @db.Uuid
  organizationId  String?  @db.Uuid
  
  term            String
  synonyms        String[]
  
  @@map("search_synonyms")
}

model SavedSearch {
  id              String   @id @default(uuid()) @db.Uuid
  ownerId         String   @db.Uuid
  
  name            String
  query           String
  filters         Json
  facets          Json
  
  @@map("search_saved")
}

model SearchRankingProfile {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  name            String
  
  weights         Json     // { recency: 0.2, popularity: 0.3, text: 0.5 }
  
  @@map("search_ranking_profiles")
}

model SearchAnalytics {
  id              String   @id @default(uuid()) @db.Uuid
  query           String
  latencyMs       Int
  resultCount     Int
  
  executedBy      String?  @db.Uuid
  executedAt      DateTime @default(now())
  
  @@map("search_analytics")
}
`;

if (!schema.includes('model SearchIndex {')) {
  schema += newModels;
  fs.writeFileSync(schemaPath, schema);
  console.log('Search schemas appended successfully.');
} else {
  console.log('Search schemas already exist.');
}
