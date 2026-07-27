"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveScoringPlugin = void 0;
const common_1 = require("@nestjs/common");
let LeaveScoringPlugin = class LeaveScoringPlugin {
    constructor() {
        this.name = 'LeaveScore';
        this.order = 50;
    }
    isApplicable(ctx) {
        return ctx.featureFlags['PERF_INCLUDE_LEAVE'] === true
            && ctx.snapshotData?.leaveIncluded === true;
    }
    async evaluate(ctx) {
        const metrics = ctx.snapshotData?.leaveMetrics;
        if (!metrics) {
            return { component: this.name, rawScore: 0, weight: 0, weightedScore: 0, metadata: { reason: 'No leave data in snapshot' } };
        }
        const unplannedDays = metrics.unplannedLeaveDays || 0;
        const maxUnplannedThreshold = metrics.maxUnplannedThreshold || 5;
        const penalty = Math.max(0, unplannedDays - maxUnplannedThreshold) * 20;
        const rawScore = Math.max(0, 100 - penalty);
        const configWeight = ctx.cycleConfig?.leaveWeight ?? 0.05;
        return {
            component: this.name,
            rawScore,
            weight: configWeight,
            weightedScore: rawScore * configWeight,
            metadata: {
                plannedLeaveDays: metrics.plannedLeaveDays || 0,
                unplannedLeaveDays: unplannedDays,
                totalLeaveDays: metrics.totalLeaveDays || 0,
            },
        };
    }
};
exports.LeaveScoringPlugin = LeaveScoringPlugin;
exports.LeaveScoringPlugin = LeaveScoringPlugin = __decorate([
    (0, common_1.Injectable)()
], LeaveScoringPlugin);
//# sourceMappingURL=leave-scoring.plugin.js.map