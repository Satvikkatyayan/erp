"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const approval_decision_service_1 = require("./services/approval-decision.service");
const approval_lifecycle_service_1 = require("./services/approval-lifecycle.service");
const approval_orchestrator_1 = require("./orchestrator/approval.orchestrator");
const scheduling_module_1 = require("../scheduling/scheduling.module");
let ApprovalModule = class ApprovalModule {
};
exports.ApprovalModule = ApprovalModule;
exports.ApprovalModule = ApprovalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            scheduling_module_1.SchedulingModule
        ],
        providers: [
            {
                provide: 'ApprovalDecisionInterface',
                useClass: approval_decision_service_1.ApprovalDecisionService,
            },
            {
                provide: 'ApprovalLifecycleInterface',
                useClass: approval_lifecycle_service_1.ApprovalLifecycleService,
            },
            approval_orchestrator_1.ApprovalOrchestrator,
        ],
        exports: [
            approval_orchestrator_1.ApprovalOrchestrator,
        ]
    })
], ApprovalModule);
//# sourceMappingURL=approval.module.js.map