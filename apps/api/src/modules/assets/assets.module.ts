import { AssetQueryService } from './services/asset-query.service';
import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { AssetLifecycleService } from './services/asset-lifecycle.service';
import { AssetOperationEngine } from './services/asset-operation.engine';
import { AssignmentService } from './services/assignment.service';
import { ReservationEngine } from './services/reservation.engine';
import { InventoryService } from './services/inventory.service';
import { MaintenanceService } from './services/maintenance.service';
import { WarrantyEngine } from './services/warranty.engine';
import { SoftwareLicenseService } from './services/software-license.service';
import { AssetDocumentService } from './services/asset-document.service';
import { AssetRecoveryService } from './services/asset-recovery.service';
import { AssetTimelineService } from './services/asset-timeline.service';

@Module({
  imports: [CoreModule, PrismaModule],
  providers: [
    AssetQueryService,
    AssetLifecycleService,
    AssetOperationEngine,
    AssignmentService,
    ReservationEngine,
    InventoryService,
    MaintenanceService,
    WarrantyEngine,
    SoftwareLicenseService,
    AssetDocumentService,
    AssetRecoveryService,
    AssetTimelineService,
  ],
  exports: [
    AssetQueryService,
    AssetLifecycleService,
    AssetOperationEngine,
    AssignmentService,
    ReservationEngine,
    InventoryService,
    MaintenanceService,
    WarrantyEngine,
    SoftwareLicenseService,
    AssetDocumentService,
    AssetRecoveryService,
    AssetTimelineService,
  ]
})
export class AssetsModule {}
