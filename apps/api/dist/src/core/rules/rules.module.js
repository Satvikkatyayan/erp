"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesModule = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const rule_command_service_1 = require("./commands/rule-command.service");
const rule_evaluation_service_1 = require("./queries/rule-evaluation.service");
const platform_rule_sdk_1 = require("./sdk/platform-rule.sdk");
const decision_table_engine_1 = require("./evaluator/decision-table.engine");
const rule_analyzer_service_1 = require("./analysis/rule-analyzer.service");
const rule_controller_1 = require("./api/rule.controller");
const json_ast_evaluator_service_1 = require("../workflow/evaluator/json-ast-evaluator.service");
let RulesModule = class RulesModule {
};
exports.RulesModule = RulesModule;
exports.RulesModule = RulesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register({ ttl: 3600000, max: 1000 })
        ],
        controllers: [rule_controller_1.RuleController],
        providers: [
            rule_command_service_1.RuleCommandService,
            rule_evaluation_service_1.RuleEvaluationService,
            platform_rule_sdk_1.PlatformRuleSDK,
            decision_table_engine_1.DecisionTableEngine,
            rule_analyzer_service_1.RuleAnalyzerService,
            json_ast_evaluator_service_1.JsonAstEvaluator
        ],
        exports: [platform_rule_sdk_1.PlatformRuleSDK]
    })
], RulesModule);
//# sourceMappingURL=rules.module.js.map