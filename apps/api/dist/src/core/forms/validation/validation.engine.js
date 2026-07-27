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
var FormValidationEngine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormValidationEngine = void 0;
const common_1 = require("@nestjs/common");
const rule_evaluation_adapter_1 = require("./rule-evaluation-adapter");
let FormValidationEngine = FormValidationEngine_1 = class FormValidationEngine {
    constructor(ruleAdapter) {
        this.ruleAdapter = ruleAdapter;
        this.logger = new common_1.Logger(FormValidationEngine_1.name);
    }
    async validate(formConfig, payload) {
        const errors = [];
        const calculated = { ...payload };
        for (const condition of formConfig.conditions || []) {
            if (condition.type === 'CALCULATED') {
                const result = await this.ruleAdapter.evaluate(condition.ast, payload);
                calculated[condition.targetField] = result;
            }
            if (condition.type === 'VISIBILITY') {
                const isVisible = await this.ruleAdapter.evaluate(condition.ast, payload);
                calculated[`__visible_${condition.targetField}`] = isVisible;
            }
        }
        for (const validation of formConfig.validations || []) {
            if (validation.rule === 'MIN') {
                const val = calculated[validation.field];
                if (val < validation.expected) {
                    errors.push({
                        field: validation.field,
                        rule: validation.rule,
                        expected: validation.expected,
                        actual: val,
                        message: validation.messageKey || `Value must be at least ${validation.expected}`
                    });
                }
            }
        }
        return {
            isValid: errors.length === 0,
            errors,
            calculatedPayload: calculated
        };
    }
};
exports.FormValidationEngine = FormValidationEngine;
exports.FormValidationEngine = FormValidationEngine = FormValidationEngine_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rule_evaluation_adapter_1.RuleEvaluationAdapter])
], FormValidationEngine);
//# sourceMappingURL=validation.engine.js.map