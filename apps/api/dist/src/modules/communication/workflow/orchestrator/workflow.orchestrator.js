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
exports.WorkflowOrchestrator = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const workflow_identity_1 = require("../domain/workflow-identity");
const workflow_runtime_state_1 = require("../domain/workflow-runtime-state");
const workflow_started_event_1 = require("../events/workflow-started.event");
const approval_orchestrator_1 = require("../../approval/orchestrator/approval.orchestrator");
const crypto_1 = require("crypto");
let WorkflowOrchestrator = class WorkflowOrchestrator {
    constructor(decisionService, transitionService, approvalOrchestrator, eventBus) {
        this.decisionService = decisionService;
        this.transitionService = transitionService;
        this.approvalOrchestrator = approvalOrchestrator;
        this.eventBus = eventBus;
    }
    async processCommand(command) {
        const workflowId = (0, crypto_1.randomUUID)();
        const correlationId = (0, crypto_1.randomUUID)();
        const identity = new workflow_identity_1.WorkflowIdentity(workflowId, correlationId, command.tenantId);
        const state = new workflow_runtime_state_1.WorkflowRuntimeState(workflowId);
        this.eventBus.publish(new workflow_started_event_1.WorkflowStartedEvent(identity.correlationId, identity.workflowId, identity.tenantId));
        const decision = this.decisionService.evaluate(command);
        this.transitionService.executeTransition(identity, state, decision, command);
        return this.approvalOrchestrator.processCommand(identity.workflowId, 'latest-activity-id', command);
    }
};
exports.WorkflowOrchestrator = WorkflowOrchestrator;
exports.WorkflowOrchestrator = WorkflowOrchestrator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('WorkflowDecisionInterface')),
    __param(1, (0, common_1.Inject)('WorkflowTransitionInterface')),
    __metadata("design:paramtypes", [Object, Object, approval_orchestrator_1.ApprovalOrchestrator,
        cqrs_1.EventBus])
], WorkflowOrchestrator);
//# sourceMappingURL=workflow.orchestrator.js.map