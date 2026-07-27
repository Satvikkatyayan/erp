import { Cache } from 'cache-manager';
import { DecisionTableEngine } from '../evaluator/decision-table.engine';
export declare class RuleEvaluationService {
    private cacheManager;
    private decisionEngine;
    constructor(cacheManager: Cache, decisionEngine: DecisionTableEngine);
    evaluate(ruleSetKey: string, context: any): Promise<{
        outputs: {};
        trace: any[];
        metrics: {
            durationMs: number;
            wasCached: boolean;
        };
    }>;
}
//# sourceMappingURL=rule-evaluation.service.d.ts.map