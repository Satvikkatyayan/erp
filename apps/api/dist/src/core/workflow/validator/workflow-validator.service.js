"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowValidatorService = void 0;
const common_1 = require("@nestjs/common");
let WorkflowValidatorService = class WorkflowValidatorService {
    validateGraph(definition) {
        const errors = [];
        const warnings = [];
        if (!definition.states || definition.states.length === 0) {
            errors.push('Workflow must have at least one state');
        }
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }
};
exports.WorkflowValidatorService = WorkflowValidatorService;
exports.WorkflowValidatorService = WorkflowValidatorService = __decorate([
    (0, common_1.Injectable)()
], WorkflowValidatorService);
//# sourceMappingURL=workflow-validator.service.js.map