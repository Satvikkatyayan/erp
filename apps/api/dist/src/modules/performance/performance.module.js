"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceModule = void 0;
const performance_query_service_1 = require("./services/performance-query.service");
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const core_module_1 = require("../../core/core.module");
const performance_cycle_service_1 = require("./services/performance-cycle.service");
const performance_evaluation_service_1 = require("./services/performance-evaluation.service");
const performance_snapshot_service_1 = require("./services/performance-snapshot.service");
const rating_service_1 = require("./services/rating.service");
const calibration_service_1 = require("./services/calibration.service");
const nine_box_service_1 = require("./services/nine-box.service");
const development_recommendation_service_1 = require("./services/development-recommendation.service");
const goal_service_1 = require("./services/goal.service");
const goal_dependency_service_1 = require("./services/goal-dependency.service");
const kpi_service_1 = require("./services/kpi.service");
const review_template_service_1 = require("./services/review-template.service");
const performance_locking_service_1 = require("./services/performance-locking.service");
const review_snapshot_service_1 = require("./services/review-snapshot.service");
const performance_timeline_service_1 = require("./services/performance-timeline.service");
const performance_scoring_engine_1 = require("./services/performance-scoring.engine");
const goal_scoring_plugin_1 = require("./services/scoring-plugins/goal-scoring.plugin");
const competency_scoring_plugin_1 = require("./services/scoring-plugins/competency-scoring.plugin");
const kpi_scoring_plugin_1 = require("./services/scoring-plugins/kpi-scoring.plugin");
const attendance_scoring_plugin_1 = require("./services/scoring-plugins/attendance-scoring.plugin");
const leave_scoring_plugin_1 = require("./services/scoring-plugins/leave-scoring.plugin");
const normalization_plugin_1 = require("./services/scoring-plugins/normalization.plugin");
const bonus_scoring_plugin_1 = require("./services/scoring-plugins/bonus-scoring.plugin");
let PerformanceModule = class PerformanceModule {
};
exports.PerformanceModule = PerformanceModule;
exports.PerformanceModule = PerformanceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, core_module_1.CoreModule],
        providers: [
            performance_query_service_1.PerformanceQueryService,
            goal_scoring_plugin_1.GoalScoringPlugin,
            competency_scoring_plugin_1.CompetencyScoringPlugin,
            kpi_scoring_plugin_1.KpiScoringPlugin,
            attendance_scoring_plugin_1.AttendanceScoringPlugin,
            leave_scoring_plugin_1.LeaveScoringPlugin,
            normalization_plugin_1.NormalizationPlugin,
            bonus_scoring_plugin_1.BonusScoringPlugin,
            performance_scoring_engine_1.PerformanceScoringEngine,
            performance_timeline_service_1.PerformanceTimelineService,
            performance_snapshot_service_1.PerformanceSnapshotService,
            review_snapshot_service_1.ReviewSnapshotService,
            performance_locking_service_1.PerformanceLockingService,
            goal_service_1.GoalService,
            goal_dependency_service_1.GoalDependencyService,
            kpi_service_1.KpiService,
            review_template_service_1.ReviewTemplateService,
            rating_service_1.RatingService,
            calibration_service_1.CalibrationService,
            nine_box_service_1.NineBoxService,
            development_recommendation_service_1.DevelopmentRecommendationService,
            performance_evaluation_service_1.PerformanceEvaluationService,
            performance_cycle_service_1.PerformanceCycleService,
        ],
        exports: [
            performance_query_service_1.PerformanceQueryService,
            performance_cycle_service_1.PerformanceCycleService,
            goal_service_1.GoalService,
            kpi_service_1.KpiService,
            review_template_service_1.ReviewTemplateService,
            nine_box_service_1.NineBoxService,
        ],
    })
], PerformanceModule);
//# sourceMappingURL=performance.module.js.map