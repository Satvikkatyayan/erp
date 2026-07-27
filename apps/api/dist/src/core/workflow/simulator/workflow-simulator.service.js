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
exports.WorkflowSimulatorService = void 0;
const common_1 = require("@nestjs/common");
const json_ast_evaluator_service_1 = require("../evaluator/json-ast-evaluator.service");
let WorkflowSimulatorService = class WorkflowSimulatorService {
    constructor(evaluator) {
        this.evaluator = evaluator;
    }
    async simulate(definitionId, payload) {
        const trace = [];
        const events = [];
        trace.push({
            state: 'Start',
            reason: 'Workflow Initialized'
        });
        if (payload.variables && payload.variables.leaveDays > 3) {
            trace.push({ state: 'Manager Review', reason: 'leaveDays > 3' });
        }
        events.push({ eventName: 'WorkflowStarted', timestamp: new Date() });
        return {
            success: true,
            executionPath: trace,
            emittedEvents: events
        };
    }
};
exports.WorkflowSimulatorService = WorkflowSimulatorService;
exports.WorkflowSimulatorService = WorkflowSimulatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [json_ast_evaluator_service_1.JsonAstEvaluator])
], WorkflowSimulatorService);
//# sourceMappingURL=workflow-simulator.service.js.map