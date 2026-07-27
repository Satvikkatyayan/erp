import { WorkflowSimulatorService } from '../simulator/workflow-simulator.service';
import { WorkflowValidatorService } from '../validator/workflow-validator.service';
import { WorkflowReplayService } from '../replay/workflow-replay.service';
export declare class WorkflowAdvancedController {
    private readonly simulator;
    private readonly validator;
    private readonly replay;
    constructor(simulator: WorkflowSimulatorService, validator: WorkflowValidatorService, replay: WorkflowReplayService);
    simulate(id: string, payload: any): Promise<{
        success: boolean;
        executionPath: any[];
        emittedEvents: any[];
    }>;
    validate(id: string, definition: any): Promise<{
        isValid: boolean;
        errors: any[];
        warnings: any[];
    }>;
    replayWorkflow(id: string): Promise<{
        status: string;
        stepsReplayed: number;
    }>;
}
//# sourceMappingURL=workflow-simulation.controller.d.ts.map