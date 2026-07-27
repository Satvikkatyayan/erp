"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsModule = void 0;
const asset_query_service_1 = require("./services/asset-query.service");
const common_1 = require("@nestjs/common");
const core_module_1 = require("../../core/core.module");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const asset_lifecycle_service_1 = require("./services/asset-lifecycle.service");
const asset_operation_engine_1 = require("./services/asset-operation.engine");
const assignment_service_1 = require("./services/assignment.service");
const reservation_engine_1 = require("./services/reservation.engine");
const inventory_service_1 = require("./services/inventory.service");
const maintenance_service_1 = require("./services/maintenance.service");
const warranty_engine_1 = require("./services/warranty.engine");
const software_license_service_1 = require("./services/software-license.service");
const asset_document_service_1 = require("./services/asset-document.service");
const asset_recovery_service_1 = require("./services/asset-recovery.service");
const asset_timeline_service_1 = require("./services/asset-timeline.service");
let AssetsModule = class AssetsModule {
};
exports.AssetsModule = AssetsModule;
exports.AssetsModule = AssetsModule = __decorate([
    (0, common_1.Module)({
        imports: [core_module_1.CoreModule, prisma_module_1.PrismaModule],
        providers: [
            asset_query_service_1.AssetQueryService,
            asset_lifecycle_service_1.AssetLifecycleService,
            asset_operation_engine_1.AssetOperationEngine,
            assignment_service_1.AssignmentService,
            reservation_engine_1.ReservationEngine,
            inventory_service_1.InventoryService,
            maintenance_service_1.MaintenanceService,
            warranty_engine_1.WarrantyEngine,
            software_license_service_1.SoftwareLicenseService,
            asset_document_service_1.AssetDocumentService,
            asset_recovery_service_1.AssetRecoveryService,
            asset_timeline_service_1.AssetTimelineService,
        ],
        exports: [
            asset_query_service_1.AssetQueryService,
            asset_lifecycle_service_1.AssetLifecycleService,
            asset_operation_engine_1.AssetOperationEngine,
            assignment_service_1.AssignmentService,
            reservation_engine_1.ReservationEngine,
            inventory_service_1.InventoryService,
            maintenance_service_1.MaintenanceService,
            warranty_engine_1.WarrantyEngine,
            software_license_service_1.SoftwareLicenseService,
            asset_document_service_1.AssetDocumentService,
            asset_recovery_service_1.AssetRecoveryService,
            asset_timeline_service_1.AssetTimelineService,
        ]
    })
], AssetsModule);
//# sourceMappingURL=assets.module.js.map