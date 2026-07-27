import { RuleEvaluationService } from '../queries/rule-evaluation.service';
import { RuleCommandService } from '../commands/rule-command.service';
export declare class PlatformRuleSDK {
    private evaluateService;
    private commandService;
    constructor(evaluateService: RuleEvaluationService, commandService: RuleCommandService);
    evaluate(ruleSetKey: string, payload: any): Promise<{
        outputs: {};
        trace: any[];
        metrics: {
            durationMs: number;
            wasCached: boolean;
        };
    }>;
    simulate(ruleSetKey: string, payload: any): Promise<{
        outputs: {};
        trace: any[];
        metrics: {
            durationMs: number;
            wasCached: boolean;
        };
    }>;
}
//# sourceMappingURL=platform-rule.sdk.d.ts.map