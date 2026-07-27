import { Module } from '@nestjs/common';
import { ExitLifecycleService } from './services/exit-lifecycle.service';
import { ExitOperationEngine } from './engines/exit-operation.engine';
import { ClearanceMatrixEngine } from './engines/clearance-matrix.engine';
import { ExitPolicyResolver } from './resolvers/exit-policy.resolver';
import { ClearanceService } from './services/clearance.service';
import { AssetRecoveryService } from './services/asset-recovery.service';
import { SettlementService } from './services/settlement.service';
import { KnowledgeTransferService } from './services/knowledge-transfer.service';
import { InterviewService } from './services/interview.service';
import { ExitTimelineService } from './services/exit-timeline.service';
import { ExitAnalyticsService } from './services/exit-analytics.service';
import { ExitDocumentService } from './services/exit-document.service';
import { OffboardingEventPublisher } from './events/offboarding-event.publisher';
import { OffboardingEventListener } from './events/offboarding-event.listener';
import { OffboardingController } from './controllers/offboarding.controller';

@Module({
  controllers: [OffboardingController],
  providers: [
    ExitLifecycleService,
    ExitOperationEngine,
    ClearanceMatrixEngine,
    ExitPolicyResolver,
    ClearanceService,
    AssetRecoveryService,
    SettlementService,
    KnowledgeTransferService,
    InterviewService,
    ExitTimelineService,
    ExitAnalyticsService,
    ExitDocumentService,
    OffboardingEventPublisher,
    OffboardingEventListener
  ],
  exports: [ExitLifecycleService]
})
export class OffboardingModule {}
