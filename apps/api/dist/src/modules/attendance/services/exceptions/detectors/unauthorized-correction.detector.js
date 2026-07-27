"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedCorrectionDetector = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let UnauthorizedCorrectionDetector = class UnauthorizedCorrectionDetector {
    constructor() {
        this.identifier = 'UnauthorizedCorrectionDetector';
    }
    async detect(musterId, tx) {
        const muster = await tx.dailySiteMuster.findUnique({
            where: { id: musterId },
            include: { musterTimelines: true, attendanceDays: true }
        });
        if (!muster)
            return [];
        const results = [];
        for (const day of muster.attendanceDays) {
            if (day.correctionStatus === 'REQUESTED' && (muster.workflowStatus === 'LOCKED' || muster.workflowStatus === 'SUBMITTED')) {
                results.push({
                    exceptionType: client_1.AttendanceExceptionType.UNAUTHORIZED_CORRECTION,
                    severity: client_1.AttendanceExceptionSeverity.CRITICAL,
                    priority: 100,
                    description: `Correction attempted on locked/submitted muster without authorization workflow.`,
                    recommendedAction: 'Revert correction or formally reopen the muster.',
                    attendanceDayId: day.id,
                    employeeId: day.employeeId
                });
            }
        }
        return results;
    }
};
exports.UnauthorizedCorrectionDetector = UnauthorizedCorrectionDetector;
exports.UnauthorizedCorrectionDetector = UnauthorizedCorrectionDetector = __decorate([
    (0, common_1.Injectable)()
], UnauthorizedCorrectionDetector);
//# sourceMappingURL=unauthorized-correction.detector.js.map