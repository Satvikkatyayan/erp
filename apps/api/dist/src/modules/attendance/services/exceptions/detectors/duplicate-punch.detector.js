"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatePunchDetector = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let DuplicatePunchDetector = class DuplicatePunchDetector {
    constructor() {
        this.identifier = 'DuplicatePunchDetector';
    }
    async detect(musterId, tx) {
        const sessions = await tx.attendanceSession.findMany({
            where: { attendanceDay: { musterId } },
            include: { punches: true, attendanceDay: true }
        });
        const results = [];
        for (const session of sessions) {
            const checkIns = session.punches.filter(p => p.punchType === 'IN');
            const checkOuts = session.punches.filter(p => p.punchType === 'OUT');
            if (checkIns.length > 1 || checkOuts.length > 1) {
                results.push({
                    exceptionType: client_1.AttendanceExceptionType.DUPLICATE_PUNCH,
                    severity: client_1.AttendanceExceptionSeverity.MEDIUM,
                    priority: 50,
                    description: `Multiple identical punches detected in the same session (${checkIns.length} Check-Ins, ${checkOuts.length} Check-Outs).`,
                    recommendedAction: 'Review punch logs and mark duplicates as invalid.',
                    attendanceDayId: session.attendanceDayId,
                    employeeId: session.attendanceDay.employeeId
                });
            }
        }
        return results;
    }
};
exports.DuplicatePunchDetector = DuplicatePunchDetector;
exports.DuplicatePunchDetector = DuplicatePunchDetector = __decorate([
    (0, common_1.Injectable)()
], DuplicatePunchDetector);
//# sourceMappingURL=duplicate-punch.detector.js.map