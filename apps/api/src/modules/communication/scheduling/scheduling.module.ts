import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SchedulingEligibilityService } from './services/scheduling-eligibility.service';
import { SchedulingPolicyService } from './services/scheduling-policy.service';
import { SchedulingOrchestrator } from './orchestrator/scheduling.orchestrator';
import { ScheduleReleaseCoordinator } from './coordinator/schedule-release.coordinator';

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: 'SchedulingEligibilityInterface',
      useClass: SchedulingEligibilityService,
    },
    {
      provide: 'SchedulingPolicyInterface',
      useClass: SchedulingPolicyService,
    },
    SchedulingOrchestrator,
    ScheduleReleaseCoordinator,
  ],
  exports: [
    SchedulingOrchestrator,
    ScheduleReleaseCoordinator,
  ]
})
export class SchedulingModule {}
