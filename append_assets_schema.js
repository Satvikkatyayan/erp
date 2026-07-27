const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma/schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

const assetSchema = `
// ==========================================
// PHASE 5.8 - ENTERPRISE ASSET MANAGEMENT
// ==========================================

// --- Configuration & Taxonomy ---

model AssetCategory {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  code            String
  name            String
  description     String?
  assetType       String    // DURABLE, CONSUMABLE, SHARED, SOFTWARE
  isActive        Boolean   @default(true)
  
  subCategories   AssetSubCategory[]
  assets          Asset[]
  consumables     AssetConsumable[]

  @@unique([tenantId, code])
  @@map("asset_categories")
}

model AssetSubCategory {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  categoryId      String    @db.Uuid
  code            String
  name            String
  description     String?

  category        AssetCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  assets          Asset[]

  @@unique([tenantId, categoryId, code])
  @@map("asset_subcategories")
}

model AssetLocation {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  code            String
  name            String
  address         String?
  isActive        Boolean   @default(true)

  assets          Asset[]
  consumableInventory AssetConsumableInventory[]

  @@unique([tenantId, code])
  @@map("asset_locations")
}

model AssetVendor {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  code            String
  name            String
  contactInfo     Json?
  isActive        Boolean   @default(true)

  assets          Asset[]
  warrantyContracts AssetWarrantyContract[]

  @@unique([tenantId, code])
  @@map("asset_vendors")
}

// --- Physical Durable & Shared Assets ---

model Asset {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  assetType       String    // DURABLE, SHARED
  categoryId      String    @db.Uuid
  subCategoryId   String?   @db.Uuid
  locationId      String?   @db.Uuid
  vendorId        String?   @db.Uuid
  name            String
  description     String?
  status          String    @default("REGISTERED") // REGISTERED, AVAILABLE, ASSIGNED, RESERVED, MAINTENANCE, DISPOSED, RECOVERED
  condition       String    @default("NEW")        // NEW, EXCELLENT, GOOD, FAIR, DAMAGED, BEYOND_REPAIR
  createdAt       DateTime  @default(now())

  category        AssetCategory @relation(fields: [categoryId], references: [id])
  subCategory     AssetSubCategory? @relation(fields: [subCategoryId], references: [id])
  location        AssetLocation? @relation(fields: [locationId], references: [id])
  vendor          AssetVendor? @relation(fields: [vendorId], references: [id])

  identifiers     AssetIdentifier[]
  configurations  AssetConfiguration[]
  valuations      AssetValuation[]
  assignments     AssetAssignment[]
  reservations    AssetReservation[]
  maintenance     AssetWorkOrder[]
  schedules       AssetMaintenanceSchedule[]
  warranties      AssetWarrantyContract[]
  snapshots       AssetSnapshot[]
  timeline        AssetTimeline[]
  recoveries      AssetRecovery[]
  checklists      AssetChecklist[]

  @@map("asset_assets")
}

model AssetIdentifier {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  identifierType  String    // SERIAL, IMEI, MAC, BARCODE, RFID, VENDOR_TAG
  identifierValue String
  isActive        Boolean   @default(true)

  asset           Asset     @relation(fields: [assetId], references: [id], onDelete: Cascade)

  @@unique([tenantId, identifierType, identifierValue])
  @@map("asset_identifiers")
}

model AssetConfiguration {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  attributes      Json      // Model, CPU, RAM, Storage, OS, etc.
  effectiveFrom   DateTime
  effectiveTo     DateTime?
  createdAt       DateTime  @default(now())

  asset           Asset     @relation(fields: [assetId], references: [id], onDelete: Cascade)

  @@map("asset_configurations")
}

model AssetValuation {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  purchaseCost    Float
  currentValue    Float
  residualValue   Float?
  replacementCost Float?
  currency        String    @default("USD")
  valuationMethod String    @default("STRAIGHT_LINE") // STRAIGHT_LINE, REDUCING_BALANCE, MARKET_VALUE
  valuationDate   DateTime  @default(now())
  createdAt       DateTime  @default(now())

  asset           Asset     @relation(fields: [assetId], references: [id], onDelete: Cascade)

  @@map("asset_valuations")
}

// --- Consumables ---

model AssetConsumable {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  categoryId      String    @db.Uuid
  code            String
  name            String
  description     String?
  unitOfMeasure   String    @default("PIECE") // PIECE, BOX, ROLL, LITER
  reorderLevel    Int       @default(0)
  isActive        Boolean   @default(true)

  category        AssetCategory @relation(fields: [categoryId], references: [id])
  inventory       AssetConsumableInventory[]
  issues          AssetConsumableIssue[]

  @@unique([tenantId, code])
  @@map("asset_consumables")
}

model AssetConsumableInventory {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  consumableId    String    @db.Uuid
  locationId      String    @db.Uuid
  quantityOnHand  Int       @default(0)
  lastRestockedAt DateTime?
  updatedAt       DateTime  @updatedAt

  consumable      AssetConsumable @relation(fields: [consumableId], references: [id], onDelete: Cascade)
  location        AssetLocation   @relation(fields: [locationId], references: [id], onDelete: Cascade)
  movements       AssetConsumableStockMovement[]

  @@unique([tenantId, consumableId, locationId])
  @@map("asset_consumable_inventory")
}

model AssetConsumableIssue {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  consumableId    String    @db.Uuid
  employeeId      String    @db.Uuid
  quantity        Int
  issuedAt        DateTime  @default(now())
  issuedBy        String    @db.Uuid
  remarks         String?

  consumable      AssetConsumable @relation(fields: [consumableId], references: [id])

  @@map("asset_consumable_issues")
}

model AssetConsumableStockMovement {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  inventoryId     String    @db.Uuid
  movementType    String    // IN, OUT, ADJUSTMENT, WRITE_OFF
  quantity        Int
  reason          String?
  referenceId     String?   // Issue ID, PO ID, etc.
  createdAt       DateTime  @default(now())

  inventory       AssetConsumableInventory @relation(fields: [inventoryId], references: [id], onDelete: Cascade)

  @@map("asset_consumable_stock_movements")
}

// --- Assignments & Reservations ---

model AssetAssignment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  employeeId      String    @db.Uuid
  departmentId    String?   @db.Uuid
  assignedAt      DateTime  @default(now())
  assignedBy      String    @db.Uuid
  expectedReturnDate DateTime? @db.Date
  status          String    @default("ACTIVE") // ACTIVE, TRANSFERRED, RETURNED, RECOVERED
  returnedAt      DateTime?
  returnCondition String?
  remarks         String?

  asset           Asset     @relation(fields: [assetId], references: [id])
  transfers       AssetTransfer[]
  returns         AssetReturn[]

  @@map("asset_assignments")
}

model AssetTransfer {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assignmentId    String    @db.Uuid
  assetId         String    @db.Uuid
  fromEmployeeId  String    @db.Uuid
  toEmployeeId    String    @db.Uuid
  transferredAt   DateTime  @default(now())
  transferredBy   String    @db.Uuid
  status          String    @default("PENDING") // PENDING, APPROVED, REJECTED, COMPLETED
  remarks         String?

  assignment      AssetAssignment @relation(fields: [assignmentId], references: [id])

  @@map("asset_transfers")
}

model AssetReturn {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assignmentId    String    @db.Uuid
  assetId         String    @db.Uuid
  employeeId      String    @db.Uuid
  returnedAt      DateTime  @default(now())
  returnedBy      String    @db.Uuid
  condition       String    // Condition at return (NEW, EXCELLENT, GOOD, FAIR, DAMAGED, BEYOND_REPAIR)
  status          String    @default("COMPLETED")
  remarks         String?

  assignment      AssetAssignment @relation(fields: [assignmentId], references: [id])

  @@map("asset_returns")
}

model AssetReservation {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  employeeId      String    @db.Uuid
  startTime       DateTime
  endTime         DateTime
  isRecurring     Boolean   @default(false)
  recurrenceRule  String?   // RRULE string
  status          String    @default("PENDING") // PENDING, APPROVED, ACTIVE, COMPLETED, CANCELLED
  purpose         String?
  createdAt       DateTime  @default(now())
  approvedBy      String?   @db.Uuid

  asset           Asset     @relation(fields: [assetId], references: [id])

  @@map("asset_reservations")
}

// --- Software Licenses ---

model SoftwareLicense {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  name            String
  publisher       String
  licenseKey      String?
  licenseType     String    // NAMED_USER, DEVICE, CONCURRENT, FLOATING
  status          String    @default("ACTIVE") // ACTIVE, EXPIRED, TERMINATED
  purchasedAt     DateTime? @db.Date
  expiresAt       DateTime? @db.Date
  createdAt       DateTime  @default(now())

  pools           SoftwareLicensePool[]

  @@map("asset_software_licenses")
}

model SoftwareLicensePool {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  licenseId       String    @db.Uuid
  totalSeats      Int       @default(1)
  allocatedSeats  Int       @default(0)
  isActive        Boolean   @default(true)

  license         SoftwareLicense @relation(fields: [licenseId], references: [id], onDelete: Cascade)
  assignments     SoftwareSeatAssignment[]

  @@map("asset_software_license_pools")
}

model SoftwareSeatAssignment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  poolId          String    @db.Uuid
  employeeId      String?   @db.Uuid // Null if device-based
  assetId         String?   @db.Uuid // Null if named-user
  assignedAt      DateTime  @default(now())
  releasedAt      DateTime?
  status          String    @default("ACTIVE") // ACTIVE, RELEASED

  pool            SoftwareLicensePool @relation(fields: [poolId], references: [id], onDelete: Cascade)

  @@map("asset_software_seat_assignments")
}

// --- Maintenance & Warranty ---

model AssetMaintenanceSchedule {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  title           String
  description     String?
  frequency       String    // DAILY, WEEKLY, MONTHLY, QUARTERLY, ANNUALLY, CUSTOM
  nextScheduledAt DateTime
  isActive        Boolean   @default(true)

  asset           Asset     @relation(fields: [assetId], references: [id])
  workOrders      AssetWorkOrder[]

  @@map("asset_maintenance_schedules")
}

model AssetWorkOrder {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  scheduleId      String?   @db.Uuid // Null if reactive maintenance
  title           String
  description     String?
  priority        String    @default("MEDIUM") // LOW, MEDIUM, HIGH, CRITICAL
  status          String    @default("OPEN") // OPEN, IN_PROGRESS, RESOLVED, CLOSED
  assignedToId    String?   @db.Uuid // Internal technician
  vendorId        String?   @db.Uuid // External vendor
  startedAt       DateTime?
  completedAt     DateTime?
  cost            Float?
  createdAt       DateTime  @default(now())

  asset           Asset     @relation(fields: [assetId], references: [id])
  schedule        AssetMaintenanceSchedule? @relation(fields: [scheduleId], references: [id])

  @@map("asset_work_orders")
}

model AssetWarrantyContract {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  vendorId        String?   @db.Uuid
  contractType    String    // MANUFACTURER, AMC, EXTENDED, VENDOR_SUPPORT
  contractNumber  String?
  effectiveFrom   DateTime  @db.Date
  effectiveTo     DateTime  @db.Date
  terms           String?
  coverageDetails Json?
  cost            Float?
  status          String    @default("ACTIVE") // ACTIVE, EXPIRED, CANCELLED
  createdAt       DateTime  @default(now())

  asset           Asset     @relation(fields: [assetId], references: [id], onDelete: Cascade)
  vendor          AssetVendor? @relation(fields: [vendorId], references: [id])

  @@map("asset_warranty_contracts")
}

model AssetDisposal {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  disposalDate    DateTime  @default(now())
  disposalMethod  String    // SALE, SCRAP, DONATION, RECYCLE
  disposalValue   Float?
  reason          String?
  approvedBy      String    @db.Uuid
  status          String    @default("COMPLETED")

  @@map("asset_disposals")
}

// --- Recovery & Offboarding ---

model AssetRecovery {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  employeeId      String    @db.Uuid
  initiatedAt     DateTime  @default(now())
  initiatedReason String    // OFFBOARDING, UPGRADE, TERMINATION, POLICY
  status          String    @default("PENDING") // PENDING, IN_PROGRESS, RECOVERED, LOST, WAIVED
  recoveredAt     DateTime?
  recoveredBy     String?   @db.Uuid
  remarks         String?
  workflowStepId  String?   @db.Uuid // Link to Workflow SDK

  asset           Asset     @relation(fields: [assetId], references: [id])
  checklists      AssetChecklist[]

  @@map("asset_recoveries")
}

model AssetChecklist {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  recoveryId      String?   @db.Uuid
  checklistType   String    // RETURN_INSPECTION, MAINTENANCE_CHECK, ONBOARDING
  items           Json      // [{ item: "Charger Included", status: "PASS", remarks: "" }]
  completedAt     DateTime?
  completedBy     String?   @db.Uuid
  status          String    @default("PENDING") // PENDING, COMPLETED, FAILED

  asset           Asset     @relation(fields: [assetId], references: [id])
  recovery        AssetRecovery? @relation(fields: [recoveryId], references: [id])

  @@map("asset_checklists")
}

// --- Asset Kits (Versioning) ---

model AssetKit {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  organizationId  String    @db.Uuid
  code            String
  name            String
  description     String?
  isActive        Boolean   @default(true)

  versions        AssetKitVersion[]

  @@unique([tenantId, code])
  @@map("asset_kits")
}

model AssetKitVersion {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  kitId           String    @db.Uuid
  versionNumber   Int
  status          String    @default("DRAFT") // DRAFT, PUBLISHED, ARCHIVED
  effectiveFrom   DateTime?
  effectiveTo     DateTime?
  createdAt       DateTime  @default(now())

  kit             AssetKit  @relation(fields: [kitId], references: [id], onDelete: Cascade)
  items           AssetKitItem[]
  assignments     AssetKitAssignment[]

  @@map("asset_kit_versions")
}

model AssetKitItem {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  kitVersionId    String    @db.Uuid
  categoryId      String    @db.Uuid // Requires an asset of this category
  quantity        Int       @default(1)
  isMandatory     Boolean   @default(true)

  kitVersion      AssetKitVersion @relation(fields: [kitVersionId], references: [id], onDelete: Cascade)

  @@map("asset_kit_items")
}

model AssetKitAssignment {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  kitVersionId    String    @db.Uuid
  employeeId      String    @db.Uuid
  assignedAt      DateTime  @default(now())
  assignedBy      String    @db.Uuid
  status          String    @default("COMPLETED") // PARTIAL, COMPLETED

  kitVersion      AssetKitVersion @relation(fields: [kitVersionId], references: [id])

  @@map("asset_kit_assignments")
}

// --- Snapshots & Timeline ---

model AssetSnapshot {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  snapshotType    String    // ASSIGNMENT, TRANSFER, RETURN, DISPOSAL, RECOVERY
  triggerEventId  String?   // ID of the event that caused snapshot
  assetData       Json      // Asset details, identifiers, configuration
  assignmentData  Json?     // Current assignment details
  conditionData   Json?     // Condition info
  valuationData   Json?     // Valuation at time of snapshot
  createdAt       DateTime  @default(now())

  asset           Asset     @relation(fields: [assetId], references: [id], onDelete: Cascade)

  @@map("asset_snapshots")
}

model AssetTimeline {
  id              String    @id @default(uuid()) @db.Uuid
  tenantId        String    @db.Uuid
  assetId         String    @db.Uuid
  eventType       String    // AssetRegistered, AssetAssigned, AssetConditionChanged, etc.
  eventData       Json      // Payloads and deltas
  triggeredBy     String?   @db.Uuid
  createdAt       DateTime  @default(now())

  asset           Asset     @relation(fields: [assetId], references: [id], onDelete: Cascade)

  @@index([assetId, createdAt])
  @@map("asset_timelines")
}
\`;

if (!schemaContent.includes('model AssetCategory')) {
  schemaContent += '\\n' + assetSchema;
  fs.writeFileSync(schemaPath, schemaContent, 'utf8');
  console.log('Phase 5.8 Asset Management Schema appended successfully.');
} else {
  console.log('Phase 5.8 Asset Management Schema already exists.');
}
