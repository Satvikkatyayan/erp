"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingAttendanceDetector = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let MissingAttendanceDetector = class MissingAttendanceDetector {
    constructor() {
        this.identifier = 'MissingAttendanceDetector';
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
        if (expectedEmployees.length === 0)
            return [];
        const recordedEmployeeIds = new Set(muster.attendanceDays.map(d => d.employeeId));
        const results = [];
        for (const emp of expectedEmployees) {
            if (!recordedEmployeeIds.has(emp.employeeId)) {
                results.push({
                    exceptionType: client_1.AttendanceExceptionType.MISSING_ATTENDANCE,
                    severity: client_1.AttendanceExceptionSeverity.HIGH,
                    priority: 80,
                    description: `Employee ${emp.employeeName || emp.employeeId} was assigned to this site but has no attendance recorded.`,
                    recommendedAction: 'Verify with Site Clerk if employee was present. Record attendance if yes, else mark absent.',
                    employeeId: emp.employeeId
                });
            }
        }
        return results;
    }
};
exports.MissingAttendanceDetector = MissingAttendanceDetector;
exports.MissingAttendanceDetector = MissingAttendanceDetector = __decorate([
    (0, common_1.Injectable)()
], MissingAttendanceDetector);
//# sourceMappingURL=missing-attendance.detector.js.map