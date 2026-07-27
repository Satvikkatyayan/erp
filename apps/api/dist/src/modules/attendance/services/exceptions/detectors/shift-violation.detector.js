"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftViolationDetector = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ShiftViolationDetector = class ShiftViolationDetector {
    constructor() {
        this.identifier = 'ShiftViolationDetector';
    }
    async detect(musterId, tx) {
        const muster = await tx.dailySiteMuster.findUnique({
            where: { id: musterId },
            include: { attendanceDays: true }
        });
        if (!muster)
            return [];
        const results = [];
        for (const day of muster.attendanceDays) {
            if (day.lateMinutes > 0 || day.earlyExitMinutes > 0) {
                results.push({
                    exceptionType: client_1.AttendanceExceptionType.SHIFT_VIOLATION,
                    severity: client_1.AttendanceExceptionSeverity.LOW,
                    priority: 30,
                    description: `Shift violation: Late by ${day.lateMinutes} mins, Early Exit by ${day.earlyExitMinutes} mins.`,
                    recommendedAction: 'Deduct leave/pay per policy if unapproved.',
                    attendanceDayId: day.id,
                    employeeId: day.employeeId
                });
            }
        }
        return results;
    }
};
exports.ShiftViolationDetector = ShiftViolationDetector;
exports.ShiftViolationDetector = ShiftViolationDetector = __decorate([
    (0, common_1.Injectable)()
], ShiftViolationDetector);
//# sourceMappingURL=shift-violation.detector.js.map