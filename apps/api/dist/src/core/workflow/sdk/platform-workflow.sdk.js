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
exports.PlatformWorkflowSDK = void 0;
const common_1 = require("@nestjs/common");
const workflow_command_service_1 = require("../commands/workflow-command.service");
const workflow_query_service_1 = require("../queries/workflow-query.service");
let PlatformWorkflowSDK = class PlatformWorkflowSDK {
    constructor(commandService, queryService) {
        this.commandService = commandService;
        this.queryService = queryService;
    }
    async start(definitionId, entityId, initialPayload) {
        return this.commandService.startInstance(definitionId, entityId, initialPayload);
    }
    async cancel(instanceId, reason) {
        return this.commandService.cancelInstance(instanceId, reason);
    }
    async completeTask(taskId, payload) {
        return this.commandService.completeTask(taskId, payload);
    }
    async getInbox(userId) {
        return this.queryService.getInbox(userId);
    }
};
exports.PlatformWorkflowSDK = PlatformWorkflowSDK;
exports.PlatformWorkflowSDK = PlatformWorkflowSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [workflow_command_service_1.WorkflowCommandService,
        workflow_query_service_1.WorkflowQueryService])
], PlatformWorkflowSDK);
//# sourceMappingURL=platform-workflow.sdk.js.map