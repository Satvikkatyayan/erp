"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiScoringPlugin = void 0;
const common_1 = require("@nestjs/common");
let KpiScoringPlugin = class KpiScoringPlugin {
    constructor() {
        this.name = 'KPIScore';
        this.order = 30;
    }
    isApplicable(_ctx) {
        return true;
    }
    async evaluate(ctx) {
        const kpiResults = ctx.snapshotData?.kpiResults || [];
        if (kpiResults.length === 0) {
            return { component: this.name, rawScore: 0, weight: 0, weightedScore: 0, metadata: { reason: 'No KPI results' } };
        }
        const totalAchievement = kpiResults.reduce((sum, r) => sum + (r.achievementPct || 0), 0);
        const rawScore = totalAchievement / kpiResults.length;
        const configWeight = ctx.cycleConfig?.kpiWeight ?? 0.2;
        return {
            component: this.name,
            rawScore: Math.min(rawScore, 100),
            weight: configWeight,
            weightedScore: Math.min(rawScore, 100) * configWeight,
            metadata: { kpiCount: kpiResults.length, avgAchievement: rawScore },
        };
    }
};
exports.KpiScoringPlugin = KpiScoringPlugin;
exports.KpiScoringPlugin = KpiScoringPlugin = __decorate([
    (0, common_1.Injectable)()
], KpiScoringPlugin);
//# sourceMappingURL=kpi-scoring.plugin.js.map