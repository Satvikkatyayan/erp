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
exports.PlatformRuleSDK = void 0;
const common_1 = require("@nestjs/common");
const rule_evaluation_service_1 = require("../queries/rule-evaluation.service");
const rule_command_service_1 = require("../commands/rule-command.service");
let PlatformRuleSDK = class PlatformRuleSDK {
    constructor(evaluateService, commandService) {
        this.evaluateService = evaluateService;
        this.commandService = commandService;
    }
    async evaluate(ruleSetKey, payload) {
        return this.evaluateService.evaluate(ruleSetKey, payload);
    }
    async simulate(ruleSetKey, payload) {
        return this.evaluateService.evaluate(ruleSetKey, payload);
    }
};
exports.PlatformRuleSDK = PlatformRuleSDK;
exports.PlatformRuleSDK = PlatformRuleSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rule_evaluation_service_1.RuleEvaluationService,
        rule_command_service_1.RuleCommandService])
], PlatformRuleSDK);
//# sourceMappingURL=platform-rule.sdk.js.map