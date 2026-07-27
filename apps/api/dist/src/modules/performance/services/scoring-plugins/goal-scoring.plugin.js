"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalScoringPlugin = void 0;
const common_1 = require("@nestjs/common");
let GoalScoringPlugin = class GoalScoringPlugin {
    constructor() {
        this.name = 'GoalScore';
        this.order = 10;
    }
    isApplicable(_ctx) {
        return true;
    }
    async evaluate(ctx) {
        const goals = ctx.snapshotData?.goalAssignments || [];
        const goalProgress = ctx.snapshotData?.goalProgress || [];
        if (goals.length === 0) {
            return { component: this.name, rawScore: 0, weight: 0, weightedScore: 0, metadata: { reason: 'No goals assigned' } };
        }
        let totalWeight = 0;
        let weightedAchievement = 0;
        for (const assignment of goals) {
            const progress = goalProgress.filter((p) => p.assignmentId === assignment.id);
            const latestProgress = progress.length > 0
                ? progress.reduce((a, b) => (a.recordedAt > b.recordedAt ? a : b))
                : null;
            const achievementPct = latestProgress
                ? Math.min((latestProgress.progressValue / (assignment.targetValue || 100)) * 100, 100)
                : 0;
            const goalWeight = assignment.weight || (1 / goals.length);
            totalWeight += goalWeight;
            weightedAchievement += achievementPct * goalWeight;
        }
        const rawScore = totalWeight > 0 ? weightedAchievement / totalWeight : 0;
        const configWeight = ctx.cycleConfig?.goalWeight ?? 0.4;
        return {
            component: this.name,
            rawScore,
            weight: configWeight,
            weightedScore: rawScore * configWeight,
            metadata: { goalCount: goals.length, totalWeight },
        };
    }
};
exports.GoalScoringPlugin = GoalScoringPlugin;
exports.GoalScoringPlugin = GoalScoringPlugin = __decorate([
    (0, common_1.Injectable)()
], GoalScoringPlugin);
//# sourceMappingURL=goal-scoring.plugin.js.map