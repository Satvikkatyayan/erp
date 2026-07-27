"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffboardingModule = void 0;
const common_1 = require("@nestjs/common");
const exit_lifecycle_service_1 = require("./services/exit-lifecycle.service");
const exit_operation_engine_1 = require("./engines/exit-operation.engine");
const clearance_matrix_engine_1 = require("./engines/clearance-matrix.engine");
const exit_policy_resolver_1 = require("./resolvers/exit-policy.resolver");
const clearance_service_1 = require("./services/clearance.service");
const asset_recovery_service_1 = require("./services/asset-recovery.service");
const settlement_service_1 = require("./services/settlement.service");
const knowledge_transfer_service_1 = require("./services/knowledge-transfer.service");
const interview_service_1 = require("./services/interview.service");
const exit_timeline_service_1 = require("./services/exit-timeline.service");
const exit_analytics_service_1 = require("./services/exit-analytics.service");
const exit_document_service_1 = require("./services/exit-document.service");
const offboarding_event_publisher_1 = require("./events/offboarding-event.publisher");
const offboarding_event_listener_1 = require("./events/offboarding-event.listener");
const offboarding_controller_1 = require("./controllers/offboarding.controller");
let OffboardingModule = class OffboardingModule {
};
exports.OffboardingModule = OffboardingModule;
exports.OffboardingModule = OffboardingModule = __decorate([
    (0, common_1.Module)({
        controllers: [offboarding_controller_1.OffboardingController],
        providers: [
            exit_lifecycle_service_1.ExitLifecycleService,
            exit_operation_engine_1.ExitOperationEngine,
            clearance_matrix_engine_1.ClearanceMatrixEngine,
            exit_policy_resolver_1.ExitPolicyResolver,
            clearance_service_1.ClearanceService,
            asset_recovery_service_1.AssetRecoveryService,
            settlement_service_1.SettlementService,
            knowledge_transfer_service_1.KnowledgeTransferService,
            interview_service_1.InterviewService,
            exit_timeline_service_1.ExitTimelineService,
            exit_analytics_service_1.ExitAnalyticsService,
            exit_document_service_1.ExitDocumentService,
            offboarding_event_publisher_1.OffboardingEventPublisher,
            offboarding_event_listener_1.OffboardingEventListener
        ],
        exports: [exit_lifecycle_service_1.ExitLifecycleService]
    })
], OffboardingModule);
//# sourceMappingURL=offboarding.module.js.map