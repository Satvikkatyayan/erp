"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceScoringPlugin = void 0;
const common_1 = require("@nestjs/common");
let AttendanceScoringPlugin = class AttendanceScoringPlugin {
    constructor() {
        this.name = 'AttendanceScore';
        this.order = 40;
    }
    isApplicable(ctx) {
        return ctx.featureFlags['PERF_INCLUDE_ATTENDANCE'] === true
            && ctx.snapshotData?.attendanceIncluded === true;
    }
    async evaluate(ctx) {
        const metrics = ctx.snapshotData?.attendanceMetrics;
        if (!metrics) {
            return { component: this.name, rawScore: 0, weight: 0, weightedScore: 0, metadata: { reason: 'No attendance data in snapshot' } };
        }
        const totalDays = metrics.totalWorkingDays || 1;
        const presentDays = metrics.presentDays || 0;
        const rawScore = Math.min((presentDays / totalDays) * 100, 100);
        const configWeight = ctx.cycleConfig?.attendanceWeight ?? 0.05;
        return {
            component: this.name,
            rawScore,
            weight: configWeight,
            weightedScore: rawScore * configWeight,
            metadata: {
                presentDays,
                totalDays,
                absentDays: metrics.absentDays || 0,
                lateDays: metrics.lateDays || 0,
            },
        };
    }
};
exports.AttendanceScoringPlugin = AttendanceScoringPlugin;
exports.AttendanceScoringPlugin = AttendanceScoringPlugin = __decorate([
    (0, common_1.Injectable)()
], AttendanceScoringPlugin);
//# sourceMappingURL=attendance-scoring.plugin.js.map