import { JsonAstEvaluator } from '../evaluator/json-ast-evaluator.service';
export declare class WorkflowSimulatorService {
    private readonly evaluator;
    constructor(evaluator: JsonAstEvaluator);
    simulate(definitionId: string, payload: any): Promise<{
        success: boolean;
        executionPath: any[];
        emittedEvents: any[];
    }>;
}
//# sourceMappingURL=workflow-simulator.service.d.ts.map