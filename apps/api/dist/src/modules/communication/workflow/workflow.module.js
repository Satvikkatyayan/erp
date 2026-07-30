"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const workflow_decision_service_1 = require("./services/workflow-decision.service");
const workflow_transition_service_1 = require("./services/workflow-transition.service");
const workflow_orchestrator_1 = require("./orchestrator/workflow.orchestrator");
const approval_module_1 = require("../approval/approval.module");
let WorkflowModule = class WorkflowModule {
};
exports.WorkflowModule = WorkflowModule;
exports.WorkflowModule = WorkflowModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            approval_module_1.ApprovalModule
        ],
        providers: [
            {
                provide: 'WorkflowDecisionInterface',
                useClass: workflow_decision_service_1.WorkflowDecisionService,
            },
            {
                provide: 'WorkflowTransitionInterface',
                useClass: workflow_transition_service_1.WorkflowTransitionService,
            },
            workflow_orchestrator_1.WorkflowOrchestrator,
        ],
        exports: [
            workflow_orchestrator_1.WorkflowOrchestrator,
        ]
    })
], WorkflowModule);
//# sourceMappingURL=workflow.module.js.map