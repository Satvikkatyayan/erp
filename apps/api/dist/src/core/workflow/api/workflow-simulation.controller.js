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
exports.WorkflowAdvancedController = void 0;
const common_1 = require("@nestjs/common");
const workflow_simulator_service_1 = require("../simulator/workflow-simulator.service");
const workflow_validator_service_1 = require("../validator/workflow-validator.service");
const workflow_replay_service_1 = require("../replay/workflow-replay.service");
let WorkflowAdvancedController = class WorkflowAdvancedController {
    constructor(simulator, validator, replay) {
        this.simulator = simulator;
        this.validator = validator;
        this.replay = replay;
    }
    async simulate(id, payload) {
        return this.simulator.simulate(id, payload);
    }
    async validate(id, definition) {
        return this.validator.validateGraph(definition);
    }
    async replayWorkflow(id) {
        return this.replay.replayFromSnapshot(id);
    }
};
exports.WorkflowAdvancedController = WorkflowAdvancedController;
__decorate([
    (0, common_1.Post)(':id/simulate'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowAdvancedController.prototype, "simulate", null);
__decorate([
    (0, common_1.Post)(':id/validate'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkflowAdvancedController.prototype, "validate", null);
__decorate([
    (0, common_1.Post)(':id/replay'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkflowAdvancedController.prototype, "replayWorkflow", null);
exports.WorkflowAdvancedController = WorkflowAdvancedController = __decorate([
    (0, common_1.Controller)('api/v1/workflows'),
    __metadata("design:paramtypes", [workflow_simulator_service_1.WorkflowSimulatorService,
        workflow_validator_service_1.WorkflowValidatorService,
        workflow_replay_service_1.WorkflowReplayService])
], WorkflowAdvancedController);
//# sourceMappingURL=workflow-simulation.controller.js.map