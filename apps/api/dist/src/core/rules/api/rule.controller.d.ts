import { PlatformRuleSDK } from '../sdk/platform-rule.sdk';
import { RuleAnalyzerService } from '../analysis/rule-analyzer.service';
export declare class RuleController {
    private sdk;
    private analyzer;
    constructor(sdk: PlatformRuleSDK, analyzer: RuleAnalyzerService);
    evaluate(key: string, payload: any): Promise<{
        outputs: {};
        trace: any[];
        metrics: {
            durationMs: number;
            wasCached: boolean;
        };
    }>;
    simulate(key: string, payload: any): Promise<{
        outputs: {};
        trace: any[];
        metrics: {
            durationMs: number;
            wasCached: boolean;
        };
    }>;
    getImpact(id: string): Promise<{
        affectedWorkflows: string[];
        affectedModules: string[];
    }>;
}
//# sourceMappingURL=rule.controller.d.ts.map