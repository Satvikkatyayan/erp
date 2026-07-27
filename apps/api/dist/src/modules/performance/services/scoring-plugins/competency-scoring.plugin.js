"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetencyScoringPlugin = void 0;
const common_1 = require("@nestjs/common");
let CompetencyScoringPlugin = class CompetencyScoringPlugin {
    constructor() {
        this.name = 'CompetencyScore';
        this.order = 20;
    }
    isApplicable(_ctx) {
        return true;
    }
    async evaluate(ctx) {
        const assignments = ctx.snapshotData?.competencyAssignments || [];
        const ratings = ctx.snapshotData?.competencyRatings || [];
        if (assignments.length === 0) {
            return { component: this.name, rawScore: 0, weight: 0, weightedScore: 0, metadata: { reason: 'No competencies assigned' } };
        }
        let totalScore = 0;
        let count = 0;
        for (const assignment of assignments) {
            const competencyRatings = ratings.filter((r) => r.competencyId === assignment.competencyId);
            if (competencyRatings.length > 0) {
                const avgRating = competencyRatings.reduce((sum, r) => sum + r.rating, 0) / competencyRatings.length;
                const targetLevel = assignment.targetLevel || 5;
                const pctOfTarget = Math.min((avgRating / targetLevel) * 100, 100);
                totalScore += pctOfTarget;
                count++;
            }
        }
        const rawScore = count > 0 ? totalScore / count : 0;
        const configWeight = ctx.cycleConfig?.competencyWeight ?? 0.3;
        return {
            component: this.name,
            rawScore,
            weight: configWeight,
            weightedScore: rawScore * configWeight,
            metadata: { competencyCount: assignments.length, ratedCount: count },
        };
    }
};
exports.CompetencyScoringPlugin = CompetencyScoringPlugin;
exports.CompetencyScoringPlugin = CompetencyScoringPlugin = __decorate([
    (0, common_1.Injectable)()
], CompetencyScoringPlugin);
//# sourceMappingURL=competency-scoring.plugin.js.map