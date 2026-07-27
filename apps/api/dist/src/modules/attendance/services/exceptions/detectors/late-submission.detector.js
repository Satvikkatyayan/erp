"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LateSubmissionDetector = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let LateSubmissionDetector = class LateSubmissionDetector {
    constructor() {
        this.identifier = 'LateSubmissionDetector';
    }
    async detect(musterId, tx) {
        const muster = await tx.dailySiteMuster.findUnique({
            where: { id: musterId },
            include: { musterTimelines: true }
        });
        if (!muster)
            return [];
        const submissionEvent = muster.musterTimelines?.find(t => t.action === 'AttendanceSubmitted' || t.currentState === client_1.MusterWorkflowStatus.SUBMITTED);
        const results = [];
        if (submissionEvent) {
            const submittedAt = new Date(submissionEvent.timestamp);
            const limit = new Date(muster.musterDate);
            limit.setDate(limit.getDate() + 1);
            limit.setHours(10, 0, 0, 0);
            if (submittedAt > limit) {
                results.push({
                    exceptionType: client_1.AttendanceExceptionType.LATE_SUBMISSION,
                    severity: client_1.AttendanceExceptionSeverity.MEDIUM,
                    priority: 50,
                    description: `Muster was submitted late at ${submittedAt.toISOString()} (Policy: Next day 10 AM).`,
                    recommendedAction: 'Discuss with Site Clerk regarding delay.'
                });
            }
        }
        return results;
    }
};
exports.LateSubmissionDetector = LateSubmissionDetector;
exports.LateSubmissionDetector = LateSubmissionDetector = __decorate([
    (0, common_1.Injectable)()
], LateSubmissionDetector);
//# sourceMappingURL=late-submission.detector.js.map