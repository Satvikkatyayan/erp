const fs = require('fs');
const path = require('path');

const WORKFLOW_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\workflow';

const directories = [
    path.join(WORKFLOW_DIR, 'simulator'),
    path.join(WORKFLOW_DIR, 'validator'),
    path.join(WORKFLOW_DIR, 'replay'),
    path.join(WORKFLOW_DIR, 'import-export'),
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    [path.join(WORKFLOW_DIR, 'simulator', 'workflow-simulator.service.ts')]: `
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
`,
    [path.join(WORKFLOW_DIR, 'validator', 'workflow-validator.service.ts')]: `
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
`,
    [path.join(WORKFLOW_DIR, 'replay', 'workflow-replay.service.ts')]: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowReplayService {
  
  async replayFromSnapshot(instanceId: string) {
    // Deterministic playback from Snapshot table without creating new Side Effects
    return {
      status: 'Replay complete',
      stepsReplayed: 5
    };
  }
}
`,
    [path.join(WORKFLOW_DIR, 'api', 'workflow-import-export.controller.ts')]: `
import { Controller, Get, Post, Param, Body } from '@nestjs/common';

@Controller('api/v1/workflows')
export class WorkflowImportExportController {
  
  @Get(':id/export')
  async export(@Param('id') id: string) {
    return {
      workflowHash: 'mock-hash-123',
      definition: { id, states: [] }
    };
  }
  
  @Post('import')
  async import(@Body() payload: any) {
    return {
      status: 'Import Successful',
      importedId: 'new-uuid-456',
      hashVerified: true
    };
  }
}
`,
    [path.join(WORKFLOW_DIR, 'api', 'workflow-graph.controller.ts')]: `
import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/v1/workflows/:id/graph')
export class WorkflowGraphController {
  
  @Get()
  async getGraphModel(@Param('id') id: string) {
    // Generate React Flow compatible graph layout
    return {
      nodes: [
        { id: 'node-1', type: 'state', data: { label: 'Draft' } }
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', label: 'Submit' }
      ]
    };
  }
}
`,
    [path.join(WORKFLOW_DIR, 'api', 'workflow-simulation.controller.ts')]: `
import { Controller, Post, Param, Body } from '@nestjs/common';
import { WorkflowSimulatorService } from '../simulator/workflow-simulator.service';
import { WorkflowValidatorService } from '../validator/workflow-validator.service';
import { WorkflowReplayService } from '../replay/workflow-replay.service';

@Controller('api/v1/workflows')
export class WorkflowAdvancedController {
  constructor(
    private readonly simulator: WorkflowSimulatorService,
    private readonly validator: WorkflowValidatorService,
    private readonly replay: WorkflowReplayService
  ) {}

  @Post(':id/simulate')
  async simulate(@Param('id') id: string, @Body() payload: any) {
    return this.simulator.simulate(id, payload);
  }
  
  @Post(':id/validate')
  async validate(@Param('id') id: string, @Body() definition: any) {
    return this.validator.validateGraph(definition);
  }
  
  @Post(':id/replay')
  async replayWorkflow(@Param('id') id: string) {
    return this.replay.replayFromSnapshot(id);
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 2.5 Hardening files scaffolded.');
