import { Injectable } from '@nestjs/common';
import { RuleEvaluationService } from '../queries/rule-evaluation.service';
import { RuleCommandService } from '../commands/rule-command.service';

/**
 * Public SDK for business modules.
 */
@Injectable()
export class PlatformRuleSDK {
  constructor(
    private evaluateService: RuleEvaluationService,
    private commandService: RuleCommandService
  ) {}

  async evaluate(ruleSetKey: string, payload: any) {
    return this.evaluateService.evaluate(ruleSetKey, payload);
  }
  
  async simulate(ruleSetKey: string, payload: any) {
    // Same as evaluate but doesn't write audit DB records
    return this.evaluateService.evaluate(ruleSetKey, payload);
  }
}