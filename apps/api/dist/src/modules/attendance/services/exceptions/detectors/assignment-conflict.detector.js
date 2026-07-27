"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentConflictDetector = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let AssignmentConflictDetector = class AssignmentConflictDetector {
    constructor() {
        this.identifier = 'AssignmentConflictDetector';
    }
    async detect(musterId, tx) {
        const muster = await tx.dailySiteMuster.findUnique({
            where: { id: musterId },
            include: { snapshot: true, attendanceDays: true }
        });
        if (!muster || !muster.snapshot || !muster.snapshot.snapshotData)
            return [];
        const snapshotData = muster.snapshot.snapshotData;
        const expectedEmployees = Array.isArray(snapshotData) ? snapshotData : (snapshotData.assignments || []);
        const expectedIds = new Set(expectedEmployees.map(e => e.employeeId));
        const results = [];
        for (const day of muster.attendanceDays) {
            if (!expectedIds.has(day.employeeId)) {
                results.push({
                    exceptionType: client_1.AttendanceExceptionType.UNASSIGNED_EMPLOYEE,
                    severity: client_1.AttendanceExceptionSeverity.CRITICAL,
                    priority: 95,
                    description: `Attendance recorded for an employee not assigned to this site in the snapshot.`,
                    recommendedAction: 'Verify deployment status with HR. This record may be invalid.',
                    attendanceDayId: day.id,
                    employeeId: day.employeeId
                });
            }
        }
        return results;
    }
};
exports.AssignmentConflictDetector = AssignmentConflictDetector;
exports.AssignmentConflictDetector = AssignmentConflictDetector = __decorate([
    (0, common_1.Injectable)()
], AssignmentConflictDetector);
//# sourceMappingURL=assignment-conflict.detector.js.map