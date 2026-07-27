import { Injectable } from '@nestjs/common';
import { JsonAstEvaluator } from '../evaluator/json-ast-evaluator.service';

@Injectable()
export class WorkflowSimulatorService {
  constructor(private readonly evaluator: JsonAstEvaluator) {}

  async simulate(definitionId: string, payload: any) {
    const trace = [];
    const events = [];
    
    // Simulate initial state
    trace.push({
       state: 'Start',
       reason: 'Workflow Initialized'
    });
    
    // Mock condition evaluations
    if (payload.variables && payload.variables.leaveDays > 3) {
      trace.push({ state: 'Manager Review', reason: 'leaveDays > 3' });
    }
    
    // Dry run event bus
    events.push({ eventName: 'WorkflowStarted', timestamp: new Date() });
    
    return {
      success: true,
      executionPath: trace,
      emittedEvents: events
    };
  }
}