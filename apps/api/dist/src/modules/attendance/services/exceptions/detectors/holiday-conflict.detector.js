"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayConflictDetector = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let HolidayConflictDetector = class HolidayConflictDetector {
    constructor() {
        this.identifier = 'HolidayConflictDetector';
    }
    async detect(musterId, tx) {
        const muster = await tx.dailySiteMuster.findUnique({
            where: { id: musterId },
            include: { attendanceDays: true }
        });
        if (!muster)
            return [];
        const isHoliday = false;
        const results = [];
        if (isHoliday) {
            for (const day of muster.attendanceDays) {
                if (day.attendanceResult === 'PRESENT') {
                    results.push({
                        exceptionType: client_1.AttendanceExceptionType.HOLIDAY_CONFLICT,
                        severity: client_1.AttendanceExceptionSeverity.LOW,
                        priority: 20,
                        description: `Employee marked present on a declared Holiday/Weekly Off.`,
                        recommendedAction: 'Verify if compensatory off or overtime is applicable.',
                        attendanceDayId: day.id,
                        employeeId: day.employeeId
                    });
                }
            }
        }
        return results;
    }
};
exports.HolidayConflictDetector = HolidayConflictDetector;
exports.HolidayConflictDetector = HolidayConflictDetector = __decorate([
    (0, common_1.Injectable)()
], HolidayConflictDetector);
//# sourceMappingURL=holiday-conflict.detector.js.map