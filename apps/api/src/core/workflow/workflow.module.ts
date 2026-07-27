import { Module } from '@nestjs/common';
import { WorkflowCommandService } from './commands/workflow-command.service';
import { WorkflowQueryService } from './queries/workflow-query.service';
import { PlatformWorkflowSDK } from './sdk/platform-workflow.sdk';
import { JsonAstEvaluator } from './evaluator/json-ast-evaluator.service';
import { HookExecutorService } from './hooks/hook-executor.service';
import { WorkflowInstanceController } from './api/workflow-instance.controller';
import { WorkflowTaskController } from './api/workflow-task.controller';
import { WorkflowInboxController } from './api/workflow-inbox.controller';
import { WorkflowSimulatorService } from './simulator/workflow-simulator.service';
import { WorkflowValidatorService } from './validator/workflow-validator.service';
import { WorkflowReplayService } from './replay/workflow-replay.service';
import { WorkflowImportExportController } from './api/workflow-import-export.controller';
import { WorkflowGraphController } from './api/workflow-graph.controller';
import { WorkflowAdvancedController } from './api/workflow-simulation.controller';

@Module({
  controllers: [
    WorkflowInstanceController,
    WorkflowTaskController,
    WorkflowInboxController,
    WorkflowImportExportController,
    WorkflowGraphController,
    WorkflowAdvancedController,
  ],
  providers: [
    WorkflowCommandService,
    WorkflowQueryService,
    PlatformWorkflowSDK,
    JsonAstEvaluator,
    HookExecutorService,
    WorkflowSimulatorService,
    WorkflowValidatorService,
    WorkflowReplayService,
  ],
  exports: [
    PlatformWorkflowSDK,
    WorkflowQueryService,
  ],
})
export class WorkflowModule {}
