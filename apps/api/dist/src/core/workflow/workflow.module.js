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
const workflow_command_service_1 = require("./commands/workflow-command.service");
const workflow_query_service_1 = require("./queries/workflow-query.service");
const platform_workflow_sdk_1 = require("./sdk/platform-workflow.sdk");
const json_ast_evaluator_service_1 = require("./evaluator/json-ast-evaluator.service");
const hook_executor_service_1 = require("./hooks/hook-executor.service");
const workflow_instance_controller_1 = require("./api/workflow-instance.controller");
const workflow_task_controller_1 = require("./api/workflow-task.controller");
const workflow_inbox_controller_1 = require("./api/workflow-inbox.controller");
const workflow_simulator_service_1 = require("./simulator/workflow-simulator.service");
const workflow_validator_service_1 = require("./validator/workflow-validator.service");
const workflow_replay_service_1 = require("./replay/workflow-replay.service");
const workflow_import_export_controller_1 = require("./api/workflow-import-export.controller");
const workflow_graph_controller_1 = require("./api/workflow-graph.controller");
const workflow_simulation_controller_1 = require("./api/workflow-simulation.controller");
let WorkflowModule = class WorkflowModule {
};
exports.WorkflowModule = WorkflowModule;
exports.WorkflowModule = WorkflowModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            workflow_instance_controller_1.WorkflowInstanceController,
            workflow_task_controller_1.WorkflowTaskController,
            workflow_inbox_controller_1.WorkflowInboxController,
            workflow_import_export_controller_1.WorkflowImportExportController,
            workflow_graph_controller_1.WorkflowGraphController,
            workflow_simulation_controller_1.WorkflowAdvancedController,
        ],
        providers: [
            workflow_command_service_1.WorkflowCommandService,
            workflow_query_service_1.WorkflowQueryService,
            platform_workflow_sdk_1.PlatformWorkflowSDK,
            json_ast_evaluator_service_1.JsonAstEvaluator,
            hook_executor_service_1.HookExecutorService,
            workflow_simulator_service_1.WorkflowSimulatorService,
            workflow_validator_service_1.WorkflowValidatorService,
            workflow_replay_service_1.WorkflowReplayService,
        ],
        exports: [
            platform_workflow_sdk_1.PlatformWorkflowSDK,
            workflow_query_service_1.WorkflowQueryService,
        ],
    })
], WorkflowModule);
//# sourceMappingURL=workflow.module.js.map