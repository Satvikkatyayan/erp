import { Module } from '@nestjs/common';
import { RecruitmentController } from './controllers/recruitment.controller';
import { RecruitmentLifecycleService } from './services/recruitment-lifecycle.service';
import { CandidateService } from './services/candidate.service';
import { InterviewService } from './services/interview.service';
import { OfferService } from './services/offer.service';
import { BackgroundVerificationService } from './services/background-verification.service';
import { RecruitmentValidationService } from './services/recruitment-validation.service';
import { RecruitmentTimelineService } from './services/recruitment-timeline.service';
import { RecruitmentBootstrapService } from './services/recruitment-bootstrap.service';

@Module({
  controllers: [RecruitmentController],
  providers: [
    RecruitmentLifecycleService,
    CandidateService,
    InterviewService,
    OfferService,
    BackgroundVerificationService,
    RecruitmentValidationService,
    RecruitmentTimelineService,
    RecruitmentBootstrapService
  ],
  exports: [RecruitmentLifecycleService]
})
export class RecruitmentModule {}
