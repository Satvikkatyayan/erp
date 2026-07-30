import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApprovalDecisionService } from './services/approval-decision.service';
import { ApprovalLifecycleService } from './services/approval-lifecycle.service';
import { ApprovalOrchestrator } from './orchestrator/approval.orchestrator';
import { SchedulingModule } from '../scheduling/scheduling.module';

@Module({
  imports: [
    CqrsModule,
    SchedulingModule // Approval orchestrator delegates directly to Scheduling when unblocked
  ],
  providers: [
    {
      provide: 'ApprovalDecisionInterface',
      useClass: ApprovalDecisionService,
    },
    {
      provide: 'ApprovalLifecycleInterface',
      useClass: ApprovalLifecycleService,
    },
    ApprovalOrchestrator,
  ],
  exports: [
    ApprovalOrchestrator,
  ]
})
export class ApprovalModule {}
