import { JsonAstEvaluator } from '../../workflow/evaluator/json-ast-evaluator.service';
export declare class DecisionTableEngine {
    private readonly ast;
    constructor(ast: JsonAstEvaluator);
    evaluate(tableDefinition: any, context: Record<string, any>, hitPolicy?: string): {
        outputs: {};
        trace: any[];
        matchedRows: any[];
    };
}
//# sourceMappingURL=decision-table.engine.d.ts.map