"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingCheckoutDetector = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let MissingCheckoutDetector = class MissingCheckoutDetector {
    constructor() {
        this.identifier = 'MissingCheckoutDetector';
    }
    async detect(musterId, tx) {
        const sessions = await tx.attendanceSession.findMany({
            where: {
                attendanceDay: { musterId }
            },
            include: {
                punches: true,
                attendanceDay: true
            }
        });
        const results = [];
        for (const session of sessions) {
            const hasCheckIn = session.punches.some(p => p.punchType === 'IN');
            const hasCheckOut = session.punches.some(p => p.punchType === 'OUT');
            if (hasCheckIn && !hasCheckOut) {
                results.push({
                    exceptionType: client_1.AttendanceExceptionType.MISSING_CHECKOUT,
                    severity: client_1.AttendanceExceptionSeverity.MEDIUM,
                    priority: 60,
                    description: `Missing check-out punch for session.`,
                    recommendedAction: 'Manually verify departure time and add missing punch.',
                    attendanceDayId: session.attendanceDayId,
                    employeeId: session.attendanceDay.employeeId
                });
            }
        }
        return results;
    }
};
exports.MissingCheckoutDetector = MissingCheckoutDetector;
exports.MissingCheckoutDetector = MissingCheckoutDetector = __decorate([
    (0, common_1.Injectable)()
], MissingCheckoutDetector);
//# sourceMappingURL=missing-checkout.detector.js.map