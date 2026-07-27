import { RuleEvaluationAdapter } from './rule-evaluation-adapter';
export declare class FormValidationEngine {
    private ruleAdapter;
    private readonly logger;
    constructor(ruleAdapter: RuleEvaluationAdapter);
    validate(formConfig: any, payload: any): Promise<{
        isValid: boolean;
        errors: any[];
        calculatedPayload: any;
    }>;
}
//# sourceMappingURL=validation.engine.d.ts.map