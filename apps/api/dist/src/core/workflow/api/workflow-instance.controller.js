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
exports.WorkflowInstanceController = void 0;
const common_1 = require("@nestjs/common");
const workflow_command_service_1 = require("../commands/workflow-command.service");
const workflow_query_service_1 = require("../queries/workflow-query.service");
let WorkflowInstanceController = class WorkflowInstanceController {
    constructor(commandService, queryService) {
        this.commandService = commandService;
        this.queryService = queryService;
    }
    async pause(id) { return { status: 'paused', id }; }
    async resume(id) { return { status: 'resumed', id }; }
    async reopen(id) { return { status: 'reopened', id }; }
    async escalate(id) { return { status: 'escalated', id }; }
    async delegate(id, payload) { return { status: 'delegated', id }; }
    async comment(id, payload) { return { status: 'comment_added', id }; }
    async attachments(id, payload) { return { status: 'attachment_added', id }; }
    async getHistory(id) { return this.queryService.getHistory(id); }
    async getMetrics(id) { return this.queryService.getMetrics(id); }
};
exports.WorkflowInstanceController = WorkflowInstanceController;
__decorate([
    (0, common_1.Post)(':id/pause'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkflowInstanceController.prototype, "pause", null);
__decorate([
    (0, common_1.Post)(':id/resume'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkflowInstanceController.prototype, "resume", null);
__decorate([
    (0, common_1.Post)(':id/reopen'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkflowInstanceController.prototype, "reopen", null);
__decorate([
    (0, common_1.Post)(':id/escalate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkflowInstanceController.prototype, "escalate", null);
__decorate([
    (0, common_1.Post)(':id/delegate'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowInstanceController.prototype, "delegate", null);
__decorate([
    (0, common_1.Post)(':id/comment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowInstanceController.prototype, "comment", null);
__decorate([
    (0, common_1.Post)(':id/attachments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowInstanceController.prototype, "attachments", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkflowInstanceController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Get)(':id/metrics'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkflowInstanceController.prototype, "getMetrics", null);
exports.WorkflowInstanceController = WorkflowInstanceController = __decorate([
    (0, common_1.Controller)('api/v1/workflows'),
    __metadata("design:paramtypes", [workflow_command_service_1.WorkflowCommandService,
        workflow_query_service_1.WorkflowQueryService])
], WorkflowInstanceController);
//# sourceMappingURL=workflow-instance.controller.js.map