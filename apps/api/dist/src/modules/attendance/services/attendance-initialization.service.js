"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceInitializationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
let AttendanceInitializationService = class AttendanceInitializationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async initializeAggregate(musterId, snapshotData, shiftId, prismaTx) {
        const db = prismaTx || this.prisma;
        const employeeCount = snapshotData.length;
        const attendanceDaysData = snapshotData.map(emp => ({
            musterId,
            employeeId: emp.employeeId,
            attendanceResult: client_1.AttendanceResult.ABSENT,
            shiftId: shiftId,
            version: 1,
            snapshottedDesignation: emp.designationName,
            snapshottedDepartment: emp.departmentName,
            snapshottedReportingManager: emp.reportingManagerId,
            workedHours: 0,
            overtimeHours: 0,
            lateMinutes: 0,
            earlyExitMinutes: 0,
            correctionStatus: client_1.AttendanceCorrectionStatus.NONE,
            validationStatus: client_1.AttendanceValidationStatus.PENDING,
            lockStatus: client_1.AttendanceLockStatus.UNLOCKED
        }));
        await db.attendanceDay.createMany({
            data: attendanceDaysData
        });
        const updatedMuster = await db.dailySiteMuster.update({
            where: { id: musterId },
            data: {
                employeesExpected: employeeCount,
                pendingAttendance: employeeCount,
                attendanceRecorded: 0,
                presentCount: 0,
                absentCount: employeeCount,
                lateCount: 0,
                halfDayCount: 0,
                leaveCount: 0,
                overtimeCount: 0,
                completionPercentage: 0
            }
        });
        return updatedMuster;
    }
};
exports.AttendanceInitializationService = AttendanceInitializationService;
exports.AttendanceInitializationService = AttendanceInitializationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceInitializationService);
//# sourceMappingURL=attendance-initialization.service.js.map