"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PerformanceScoringEngine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceScoringEngine = void 0;
const common_1 = require("@nestjs/common");
const goal_scoring_plugin_1 = require("./scoring-plugins/goal-scoring.plugin");
const competency_scoring_plugin_1 = require("./scoring-plugins/competency-scoring.plugin");
const kpi_scoring_plugin_1 = require("./scoring-plugins/kpi-scoring.plugin");
const attendance_scoring_plugin_1 = require("./scoring-plugins/attendance-scoring.plugin");
const leave_scoring_plugin_1 = require("./scoring-plugins/leave-scoring.plugin");
const normalization_plugin_1 = require("./scoring-plugins/normalization.plugin");
const bonus_scoring_plugin_1 = require("./scoring-plugins/bonus-scoring.plugin");
let PerformanceScoringEngine = PerformanceScoringEngine_1 = class PerformanceScoringEngine {
    constructor(goalPlugin, competencyPlugin, kpiPlugin, attendancePlugin, leavePlugin, normalizationPlugin, bonusPlugin) {
        this.goalPlugin = goalPlugin;
        this.competencyPlugin = competencyPlugin;
        this.kpiPlugin = kpiPlugin;
        this.attendancePlugin = attendancePlugin;
        this.leavePlugin = leavePlugin;
        this.normalizationPlugin = normalizationPlugin;
        this.bonusPlugin = bonusPlugin;
        this.logger = new common_1.Logger(PerformanceScoringEngine_1.name);
        this.ENGINE_VERSION = '1.0.0';
        this.plugins = [
            this.goalPlugin,
            this.competencyPlugin,
            this.kpiPlugin,
            this.attendancePlugin,
            this.leavePlugin,
            this.normalizationPlugin,
            this.bonusPlugin,
        ].sort((a, b) => a.order - b.order);
    }
    async evaluate(ctx) {
        this.logger.debug(`Evaluating performance for employee ${ctx.employeeId} in cycle ${ctx.cycleId}`);
        const steps = [];
        let cumulativeWeightedTotal = 0;
        for (const plugin of this.plugins) {
            if (plugin.name === 'Normalization' || plugin.name === 'BonusRecommendation')
                continue;
            if (!plugin.isApplicable(ctx)) {
                this.logger.debug(`Plugin ${plugin.name} skipped (not applicable)`);
                continue;
            }
            const result = await plugin.evaluate(ctx);
            steps.push(result);
            cumulativeWeightedTotal += result.weightedScore;
        }
        const normCtx = {
            ...ctx,
            snapshotData: { ...ctx.snapshotData, _cumulativeWeightedTotal: cumulativeWeightedTotal },
        };
        const normResult = await this.normalizationPlugin.evaluate(normCtx);
        steps.push(normResult);
        const normalizedScore = normResult.weightedScore;
        let bonusPct = 0;
        const bonusCtx = {
            ...ctx,
            snapshotData: { ...ctx.snapshotData, _normalizedScore: normalizedScore },
        };
        if (this.bonusPlugin.isApplicable(bonusCtx)) {
            const bonusResult = await this.bonusPlugin.evaluate(bonusCtx);
            steps.push(bonusResult);
            bonusPct = bonusResult.metadata?.recommendedBonusPct ?? 0;
        }
        const goalStep = steps.find(s => s.component === 'GoalScore');
        const competencyStep = steps.find(s => s.component === 'CompetencyScore');
        const kpiStep = steps.find(s => s.component === 'KPIScore');
        const attendanceStep = steps.find(s => s.component === 'AttendanceScore');
        const leaveStep = steps.find(s => s.component === 'LeaveScore');
        const trace = {
            steps,
            goalScore: goalStep?.rawScore ?? 0,
            competencyScore: competencyStep?.rawScore ?? 0,
            kpiScore: kpiStep?.rawScore ?? 0,
            attendanceScore: attendanceStep?.rawScore ?? 0,
            leaveScore: leaveStep?.rawScore ?? 0,
            weightedTotal: cumulativeWeightedTotal,
            normalizedScore,
            finalRating: normalizedScore,
            bonusRecommendationPct: bonusPct,
            engineVersion: this.ENGINE_VERSION,
        };
        this.logger.debug(`Score trace complete: final=${normalizedScore}, bonus=${bonusPct}%`);
        return trace;
    }
    async simulate(ctx) {
        return this.evaluate(ctx);
    }
    applyForcedDistribution(scores, distributionPolicy) {
        const sorted = [...scores].sort((a, b) => b.score - a.score);
        const total = sorted.length;
        const topCount = Math.round(total * (distributionPolicy.top / 100));
        const bottomCount = Math.round(total * (distributionPolicy.bottom / 100));
        return sorted.map((s, idx) => {
            let bucket;
            let adjustedScore = s.score;
            if (idx < topCount) {
                bucket = 'Top';
                adjustedScore = Math.max(s.score, 85);
            }
            else if (idx >= total - bottomCount) {
                bucket = 'Bottom';
                adjustedScore = Math.min(s.score, 50);
            }
            else {
                bucket = 'Middle';
            }
            return { employeeId: s.employeeId, originalScore: s.score, adjustedScore, bucket };
        });
    }
};
exports.PerformanceScoringEngine = PerformanceScoringEngine;
exports.PerformanceScoringEngine = PerformanceScoringEngine = PerformanceScoringEngine_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [goal_scoring_plugin_1.GoalScoringPlugin,
        competency_scoring_plugin_1.CompetencyScoringPlugin,
        kpi_scoring_plugin_1.KpiScoringPlugin,
        attendance_scoring_plugin_1.AttendanceScoringPlugin,
        leave_scoring_plugin_1.LeaveScoringPlugin,
        normalization_plugin_1.NormalizationPlugin,
        bonus_scoring_plugin_1.BonusScoringPlugin])
], PerformanceScoringEngine);
//# sourceMappingURL=performance-scoring.engine.js.map