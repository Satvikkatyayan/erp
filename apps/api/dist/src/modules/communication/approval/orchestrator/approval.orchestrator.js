"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalOrchestrator = void 0;
const common_1 = require("@nestjs/common");
const approval_identity_1 = require("../domain/approval-identity");
const approval_runtime_state_1 = require("../domain/approval-runtime-state");
const approval_history_1 = require("../domain/approval-history");
const delivery_result_1 = require("../../domain/delivery-result");
const delivery_lifecycle_enum_1 = require("../../domain/delivery-lifecycle.enum");
const scheduling_orchestrator_1 = require("../../scheduling/orchestrator/scheduling.orchestrator");
const crypto_1 = require("crypto");
let ApprovalOrchestrator = class ApprovalOrchestrator {
    constructor(decisionService, lifecycleService, schedulingOrchestrator) {
        this.decisionService = decisionService;
        this.lifecycleService = lifecycleService;
        this.schedulingOrchestrator = schedulingOrchestrator;
    }
    async processCommand(workflowId, workflowActivityId, command) {
        const approvalId = (0, crypto_1.randomUUID)();
        const correlationId = (0, crypto_1.randomUUID)();
        const identity = new approval_identity_1.ApprovalIdentity(approvalId, workflowId, workflowActivityId, correlationId, command.tenantId);
        const state = new approval_runtime_state_1.ApprovalRuntimeState(approvalId);
        const history = new approval_history_1.ApprovalHistory(approvalId);
        const decision = this.decisionService.evaluate(command);
        if (decision.requiresApproval) {
            this.lifecycleService.initializeApproval(identity, state, history, decision);
            return new delivery_result_1.DeliveryResult(true, delivery_lifecycle_enum_1.DeliveryLifecycle.RECEIVED, correlationId, {
                code: 'APPROVAL_PENDING',
                message: 'Communication requires human approval'
            });
        }
        return this.schedulingOrchestrator.processCommand(command);
    }
};
exports.ApprovalOrchestrator = ApprovalOrchestrator;
exports.ApprovalOrchestrator = ApprovalOrchestrator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ApprovalDecisionInterface')),
    __param(1, (0, common_1.Inject)('ApprovalLifecycleInterface')),
    __metadata("design:paramtypes", [Object, Object, scheduling_orchestrator_1.SchedulingOrchestrator])
], ApprovalOrchestrator);
//# sourceMappingURL=approval.orchestrator.js.map