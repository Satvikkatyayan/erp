const fs = require('fs');
const path = require('path');

const WORKFLOW_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\workflow';

const directories = [
    path.join(WORKFLOW_DIR, 'evaluator'),
    path.join(WORKFLOW_DIR, 'commands'),
    path.join(WORKFLOW_DIR, 'queries'),
    path.join(WORKFLOW_DIR, 'sdk'),
    path.join(WORKFLOW_DIR, 'transitions'),
    path.join(WORKFLOW_DIR, 'hooks'),
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    [path.join(WORKFLOW_DIR, 'evaluator', 'condition-evaluator.interface.ts')]: `
export interface ConditionEvaluator {
  evaluate(condition: any, context: Record<string, any>): boolean;
}
`,
    [path.join(WORKFLOW_DIR, 'evaluator', 'json-ast-evaluator.service.ts')]: `
import { Injectable } from '@nestjs/common';
import { ConditionEvaluator } from './condition-evaluator.interface';

@Injectable()
export class JsonAstEvaluator implements ConditionEvaluator {
  evaluate(condition: any, context: Record<string, any>): boolean {
    if (!condition) return true;
    
    // Simple mock AST evaluator for now
    if (condition.operator === 'EQUALS') {
        return context[condition.field] === condition.value;
    }
    if (condition.operator === 'GREATER_THAN_OR_EQUAL') {
        return context[condition.field] >= condition.value;
    }
    if (condition.AND) {
        return condition.AND.every(cond => this.evaluate(cond, context));
    }
    
    return false;
  }
}
`,
    [path.join(WORKFLOW_DIR, 'commands', 'workflow-command.service.ts')]: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowCommandService {
  async startInstance(definitionId: string, entityId: string, payload: any) {
    // Logic to initialize workflow, evaluate variables, and find initial state
  }

  async cancelInstance(instanceId: string, reason: string) {
    // Cancellation logic with compensation hooks
  }

  async completeTask(taskId: string, payload: any) {
    // Task completion, validation, state transition logic
  }
}
`,
    [path.join(WORKFLOW_DIR, 'queries', 'workflow-query.service.ts')]: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowQueryService {
  async getInbox(userId: string) {
    // Get pending tasks for user
  }

  async getHistory(instanceId: string) {
    // Fetch snapshots and task histories
  }
  
  async getMetrics(definitionId: string) {
     // Return WorkflowMetrics
  }
}
`,
    [path.join(WORKFLOW_DIR, 'sdk', 'platform-workflow.sdk.ts')]: `
import { Injectable } from '@nestjs/common';
import { WorkflowCommandService } from '../commands/workflow-command.service';
import { WorkflowQueryService } from '../queries/workflow-query.service';

/**
 * Public SDK for business modules.
 * Business modules should NEVER inject internal workflow services directly.
 */
@Injectable()
export class PlatformWorkflowSDK {
  constructor(
    private readonly commandService: WorkflowCommandService,
    private readonly queryService: WorkflowQueryService
  ) {}

  async start(definitionId: string, entityId: string, initialPayload: any) {
    return this.commandService.startInstance(definitionId, entityId, initialPayload);
  }

  async cancel(instanceId: string, reason: string) {
    return this.commandService.cancelInstance(instanceId, reason);
  }

  async completeTask(taskId: string, payload: any) {
    return this.commandService.completeTask(taskId, payload);
  }

  async getInbox(userId: string) {
    return this.queryService.getInbox(userId);
  }
}
`,
    [path.join(WORKFLOW_DIR, 'transitions', 'transition-validator.interface.ts')]: `
export interface TransitionValidator {
  validate(transition: any, context: any): Promise<boolean>;
}
`,
    [path.join(WORKFLOW_DIR, 'hooks', 'hook-executor.service.ts')]: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class HookExecutorService {
  async executeOnEnter(stateId: string, context: any) {
    // Logic to execute onEnter hooks
  }

  async executeOnExit(stateId: string, context: any) {
    // Logic to execute onExit hooks
  }

  async executeCompensation(transitionId: string, context: any) {
    // Logic to execute rollback/compensation hooks
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 2 Workflow files scaffolded.');
