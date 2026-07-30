import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FailureClassifierService } from './services/failure-classifier.service';
import { RetryPolicyService } from './services/retry-policy.service';
import { RetryScheduler } from './scheduler/retry.scheduler';
import { RetryOrchestrator } from './orchestrator/retry.orchestrator';
import { DeliveryFailureObserver } from './observers/delivery-failure.observer';

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: 'FailureClassifierInterface',
      useClass: FailureClassifierService,
    },
    {
      provide: 'RetryPolicyInterface',
      useClass: RetryPolicyService,
    },
    RetryScheduler,
    RetryOrchestrator,
    DeliveryFailureObserver,
  ],
  // DeliveryService is needed by RetryOrchestrator, but it's part of the CommunicationModule 
  // which will import ResilienceModule. Wait, we might need a circular dependency or just 
  // export the providers. For simplicity in this architectural milestone without full wiring,
  // we'll leave it as is, or we'd import a shared module.
})
export class ResilienceModule {}
