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
exports.RuleEvaluationService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const decision_table_engine_1 = require("../evaluator/decision-table.engine");
let RuleEvaluationService = class RuleEvaluationService {
    constructor(cacheManager, decisionEngine) {
        this.cacheManager = cacheManager;
        this.decisionEngine = decisionEngine;
    }
    async evaluate(ruleSetKey, context) {
        const cacheKey = `rule:${ruleSetKey}:latest`;
        let definition = await this.cacheManager.get(cacheKey);
        let wasCached = true;
        if (!definition) {
            definition = { hitPolicy: 'UNIQUE', rows: [] };
            await this.cacheManager.set(cacheKey, definition, 3600000);
            wasCached = false;
        }
        const startTime = Date.now();
        const result = this.decisionEngine.evaluate(definition, context, definition.hitPolicy);
        const durationMs = Date.now() - startTime;
        return {
            outputs: result.outputs,
            trace: result.trace,
            metrics: { durationMs, wasCached }
        };
    }
};
exports.RuleEvaluationService = RuleEvaluationService;
exports.RuleEvaluationService = RuleEvaluationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, decision_table_engine_1.DecisionTableEngine])
], RuleEvaluationService);
//# sourceMappingURL=rule-evaluation.service.js.map