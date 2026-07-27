"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OvertimeThresholdDetector = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let OvertimeThresholdDetector = class OvertimeThresholdDetector {
    constructor() {
        this.identifier = 'OvertimeThresholdDetector';
    }
    async detect(musterId, tx) {
        const muster = await tx.dailySiteMuster.findUnique({
            where: { id: musterId },
            include: { attendanceDays: true }
        });
        if (!muster)
            return [];
        const results = [];
        const MAX_OT_HOURS_PER_DAY = 4;
        for (const day of muster.attendanceDays) {
            if (day.overtimeHours && Number(day.overtimeHours) > MAX_OT_HOURS_PER_DAY) {
                results.push({
                    exceptionType: client_1.AttendanceExceptionType.OVERTIME_THRESHOLD,
                    severity: client_1.AttendanceExceptionSeverity.MEDIUM,
                    priority: 40,
                    description: `Employee recorded ${day.overtimeHours} hours of OT, exceeding the daily limit of ${MAX_OT_HOURS_PER_DAY} hours.`,
                    recommendedAction: 'Requires PM/HR approval for excess OT.',
                    attendanceDayId: day.id,
                    employeeId: day.employeeId
                });
            }
        }
        return results;
    }
};
exports.OvertimeThresholdDetector = OvertimeThresholdDetector;
exports.OvertimeThresholdDetector = OvertimeThresholdDetector = __decorate([
    (0, common_1.Injectable)()
], OvertimeThresholdDetector);
//# sourceMappingURL=overtime-threshold.detector.js.map