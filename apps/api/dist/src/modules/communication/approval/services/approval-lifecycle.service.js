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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalLifecycleService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const approval_history_1 = require("../domain/approval-history");
const approval_state_enum_1 = require("../domain/approval-state.enum");
const approval_requested_event_1 = require("../events/approval-requested.event");
const approval_assignment_created_event_1 = require("../events/approval-assignment-created.event");
const crypto_1 = require("crypto");
let ApprovalLifecycleService = class ApprovalLifecycleService {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    initializeApproval(identity, state, history, decision) {
        if (!decision.requiresApproval) {
            return;
        }
        state.transitionTo(approval_state_enum_1.ApprovalState.PENDING);
        history.append(new approval_history_1.ApprovalHistoryEvent(new Date(), approval_state_enum_1.ApprovalState.PENDING));
        this.eventBus.publish(new approval_requested_event_1.ApprovalRequestedEvent(identity.correlationId, identity.approvalId, identity.workflowId, identity.workflowActivityId, identity.tenantId));
        for (const approverId of decision.initialApprovers) {
            const assignmentId = (0, crypto_1.randomUUID)();
            this.eventBus.publish(new approval_assignment_created_event_1.ApprovalAssignmentCreatedEvent(identity.correlationId, identity.approvalId, assignmentId, identity.tenantId));
        }
    }
};
exports.ApprovalLifecycleService = ApprovalLifecycleService;
exports.ApprovalLifecycleService = ApprovalLifecycleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cqrs_1.EventBus])
], ApprovalLifecycleService);
//# sourceMappingURL=approval-lifecycle.service.js.map