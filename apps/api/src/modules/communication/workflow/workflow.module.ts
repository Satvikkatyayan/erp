import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { WorkflowDecisionService } from './services/workflow-decision.service';
import { WorkflowTransitionService } from './services/workflow-transition.service';
import { WorkflowOrchestrator } from './orchestrator/workflow.orchestrator';
import { ApprovalModule } from '../approval/approval.module';

@Module({
  imports: [
    CqrsModule, 
    ApprovalModule // Workflow delegates activities to Approval
  ],
  providers: [
    {
      provide: 'WorkflowDecisionInterface',
      useClass: WorkflowDecisionService,
    },
    {
      provide: 'WorkflowTransitionInterface',
      useClass: WorkflowTransitionService,
    },
    WorkflowOrchestrator,
  ],
  exports: [
    WorkflowOrchestrator,
  ]
})
export class WorkflowModule {}
