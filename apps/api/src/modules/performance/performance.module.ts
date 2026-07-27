import { PerformanceQueryService } from './services/performance-query.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { CoreModule } from '../../core/core.module';

// Services
import { PerformanceCycleService } from './services/performance-cycle.service';
import { PerformanceEvaluationService } from './services/performance-evaluation.service';
import { PerformanceSnapshotService } from './services/performance-snapshot.service';
import { RatingService } from './services/rating.service';
import { CalibrationService } from './services/calibration.service';
import { NineBoxService } from './services/nine-box.service';
import { DevelopmentRecommendationService } from './services/development-recommendation.service';
import { GoalService } from './services/goal.service';
import { GoalDependencyService } from './services/goal-dependency.service';
import { KpiService } from './services/kpi.service';
import { ReviewTemplateService } from './services/review-template.service';
import { PerformanceLockingService } from './services/performance-locking.service';
import { ReviewSnapshotService } from './services/review-snapshot.service';
import { PerformanceTimelineService } from './services/performance-timeline.service';

// Engine & Plugins
import { PerformanceScoringEngine } from './services/performance-scoring.engine';
import { GoalScoringPlugin } from './services/scoring-plugins/goal-scoring.plugin';
import { CompetencyScoringPlugin } from './services/scoring-plugins/competency-scoring.plugin';
import { KpiScoringPlugin } from './services/scoring-plugins/kpi-scoring.plugin';
import { AttendanceScoringPlugin } from './services/scoring-plugins/attendance-scoring.plugin';
import { LeaveScoringPlugin } from './services/scoring-plugins/leave-scoring.plugin';
import { NormalizationPlugin } from './services/scoring-plugins/normalization.plugin';
import { BonusScoringPlugin } from './services/scoring-plugins/bonus-scoring.plugin';

@Module({
  imports: [PrismaModule, CoreModule],
  providers: [
    PerformanceQueryService,
    // Plugins
    GoalScoringPlugin,
    CompetencyScoringPlugin,
    KpiScoringPlugin,
    AttendanceScoringPlugin,
    LeaveScoringPlugin,
    NormalizationPlugin,
    BonusScoringPlugin,

    // Engine
    PerformanceScoringEngine,

    // Core Services
    PerformanceTimelineService,
    PerformanceSnapshotService,
    ReviewSnapshotService,
    PerformanceLockingService,
    GoalService,
    GoalDependencyService,
    KpiService,
    ReviewTemplateService,
    RatingService,
    CalibrationService,
    NineBoxService,
    DevelopmentRecommendationService,

    // Orchestration
    PerformanceEvaluationService,
    PerformanceCycleService,
  ],
  exports: [
    PerformanceQueryService,
    PerformanceCycleService,
    GoalService,
    KpiService,
    ReviewTemplateService,
    NineBoxService,
  ],
})
export class PerformanceModule {}
