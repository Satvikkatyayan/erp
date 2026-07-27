import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowValidatorService {
  
  validateGraph(definition: any) {
    const errors = [];
    const warnings = [];
    
    // Mock topological checks
    if (!definition.states || definition.states.length === 0) {
      errors.push('Workflow must have at least one state');
    }
    
    // Check for unreachable states (BFS/DFS stub)
    // Check for orphan transitions
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}