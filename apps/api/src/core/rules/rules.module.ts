import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RuleCommandService } from './commands/rule-command.service';
import { RuleEvaluationService } from './queries/rule-evaluation.service';
import { PlatformRuleSDK } from './sdk/platform-rule.sdk';
import { DecisionTableEngine } from './evaluator/decision-table.engine';
import { RuleAnalyzerService } from './analysis/rule-analyzer.service';
import { RuleController } from './api/rule.controller';
import { JsonAstEvaluator } from '../workflow/evaluator/json-ast-evaluator.service';

@Module({
  imports: [
    CacheModule.register({ ttl: 3600000, max: 1000 })
  ],
  controllers: [RuleController],
  providers: [
    RuleCommandService,
    RuleEvaluationService,
    PlatformRuleSDK,
    DecisionTableEngine,
    RuleAnalyzerService,
    JsonAstEvaluator
  ],
  exports: [PlatformRuleSDK]
})
export class RulesModule {}
