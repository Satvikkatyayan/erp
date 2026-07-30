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
exports.WorkflowTransitionService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const workflow_state_enum_1 = require("../domain/workflow-state.enum");
const workflow_activity_1 = require("../domain/workflow-activity");
const workflow_activity_selected_event_1 = require("../events/workflow-activity-selected.event");
const workflow_paused_event_1 = require("../events/workflow-paused.event");
const workflow_completed_event_1 = require("../events/workflow-completed.event");
const crypto_1 = require("crypto");
let WorkflowTransitionService = class WorkflowTransitionService {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    executeTransition(identity, state, decision, command) {
        if (decision.nextActivityType) {
            const activityId = (0, crypto_1.randomUUID)();
            const activity = new workflow_activity_1.WorkflowActivity(activityId, identity.workflowId, decision.nextActivityType, command.payload);
            state.addActivity(activity);
            this.eventBus.publish(new workflow_activity_selected_event_1.WorkflowActivitySelectedEvent(identity.correlationId, identity.workflowId, activityId, decision.nextActivityType, identity.tenantId));
        }
        if (decision.shouldPause) {
            state.transitionTo(workflow_state_enum_1.WorkflowState.WAITING);
            this.eventBus.publish(new workflow_paused_event_1.WorkflowPausedEvent(identity.correlationId, identity.workflowId, 'SYSTEM_PAUSE', identity.tenantId));
            return;
        }
        if (decision.shouldTerminate) {
            state.transitionTo(workflow_state_enum_1.WorkflowState.COMPLETED);
            this.eventBus.publish(new workflow_completed_event_1.WorkflowCompletedEvent(identity.correlationId, identity.workflowId, identity.tenantId));
            return;
        }
        state.transitionTo(workflow_state_enum_1.WorkflowState.ACTIVE);
    }
};
exports.WorkflowTransitionService = WorkflowTransitionService;
exports.WorkflowTransitionService = WorkflowTransitionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cqrs_1.EventBus])
], WorkflowTransitionService);
//# sourceMappingURL=workflow-transition.service.js.map