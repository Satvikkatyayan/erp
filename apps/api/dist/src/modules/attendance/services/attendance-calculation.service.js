"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AttendanceCalculationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCalculationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const event_bus_service_1 = require("../../../core/events/event-bus.service");
const attendance_summary_repository_1 = require("../repositories/attendance-summary.repository");
const uuid_1 = require("uuid");
const crypto = __importStar(require("crypto"));
let AttendanceCalculationService = AttendanceCalculationService_1 = class AttendanceCalculationService {
    constructor(prisma, eventBus, summaryRepo) {
        this.prisma = prisma;
        this.eventBus = eventBus;
        this.summaryRepo = summaryRepo;
        this.logger = new common_1.Logger(AttendanceCalculationService_1.name);
    }
    async calculateSummary(employeeId, payrollPeriodId, generatedById, tx) {
        const client = tx || this.prisma;
        const period = await client.payPayrollPeriod.findUniqueOrThrow({ where: { id: payrollPeriodId } });
        const attendanceDays = await client.attendanceDay.findMany({
            where: {
                employeeId,
                muster: {
                    musterDate: {
                        gte: period.startDate,
                        lte: period.endDate
                    }
                }
            },
            include: {
                muster: {
                    include: { exceptions: true }
                }
            }
        });
        const timeMetrics = {
            workedHours: 0, grossWorkedHours: 0, netWorkedHours: 0, breakDuration: 0,
            lateMinutes: 0, earlyExitMinutes: 0, overtimeHours: 0, nightShiftHours: 0,
            weekendHours: 0, holidayHours: 0, shiftCompliancePercentage: 100
        };
        const attendanceMetrics = {
            presentDays: 0, absentDays: 0, halfDays: 0, paidLeaveDays: 0, casualLeaveDays: 0,
            compOffDays: 0, trainingDays: 0, businessTravelDays: 0, holidayDays: 0, weeklyOffDays: 0,
            attendancePercentage: 0, attendanceWeight: 0
        };
        const exceptionMetrics = {
            criticalExceptions: 0, highPriorityExceptions: 0, mediumPriorityExceptions: 0, lowPriorityExceptions: 0,
            resolvedExceptions: 0, outstandingExceptions: 0, reviewCompletionPercentage: 100
        };
        const leaveSummary = {
            approvedLeave: 0, pendingLeave: 0, rejectedLeave: 0, leaveBalanceUsed: 0, leaveTypes: {}, leaveDuration: 0
        };
        const projectSiteSummary = {
            workedSites: [], workedProjects: [], workedCostCenters: [],
            daysPerSite: {}, daysPerProject: {}, hoursPerSite: {}, hoursPerProject: {}
        };
        const sourceMusterIds = new Set();
        for (const day of attendanceDays) {
            sourceMusterIds.add(day.musterId);
            timeMetrics.workedHours += Number(day.workedHours);
            timeMetrics.overtimeHours += Number(day.overtimeHours);
            timeMetrics.lateMinutes += day.lateMinutes;
            timeMetrics.earlyExitMinutes += day.earlyExitMinutes;
            switch (day.attendanceResult) {
                case 'PRESENT':
                    attendanceMetrics.presentDays++;
                    break;
                case 'ABSENT':
                    attendanceMetrics.absentDays++;
                    break;
                case 'HALF_DAY':
                    attendanceMetrics.halfDays++;
                    break;
                case 'PAID_LEAVE':
                    attendanceMetrics.paidLeaveDays++;
                    leaveSummary.approvedLeave++;
                    break;
                case 'CASUAL_LEAVE':
                    attendanceMetrics.casualLeaveDays++;
                    leaveSummary.approvedLeave++;
                    break;
                case 'HOLIDAY':
                    attendanceMetrics.holidayDays++;
                    break;
                case 'WEEKLY_OFF':
                    attendanceMetrics.weeklyOffDays++;
                    break;
            }
            if (!projectSiteSummary.workedSites.includes(day.muster.siteId))
                projectSiteSummary.workedSites.push(day.muster.siteId);
            if (!projectSiteSummary.workedProjects.includes(day.muster.projectId))
                projectSiteSummary.workedProjects.push(day.muster.projectId);
            projectSiteSummary.daysPerSite[day.muster.siteId] = (projectSiteSummary.daysPerSite[day.muster.siteId] || 0) + 1;
            projectSiteSummary.daysPerProject[day.muster.projectId] = (projectSiteSummary.daysPerProject[day.muster.projectId] || 0) + 1;
            projectSiteSummary.hoursPerSite[day.muster.siteId] = (projectSiteSummary.hoursPerSite[day.muster.siteId] || 0) + Number(day.workedHours);
            projectSiteSummary.hoursPerProject[day.muster.projectId] = (projectSiteSummary.hoursPerProject[day.muster.projectId] || 0) + Number(day.workedHours);
            for (const exc of day.muster.exceptions.filter(e => e.employeeId === employeeId)) {
                if (exc.severity === 'CRITICAL')
                    exceptionMetrics.criticalExceptions++;
                else if (exc.severity === 'HIGH')
                    exceptionMetrics.highPriorityExceptions++;
                else if (exc.severity === 'MEDIUM')
                    exceptionMetrics.mediumPriorityExceptions++;
                else
                    exceptionMetrics.lowPriorityExceptions++;
                if (exc.status === 'RESOLVED' || exc.status === 'DISMISSED')
                    exceptionMetrics.resolvedExceptions++;
                else
                    exceptionMetrics.outstandingExceptions++;
            }
        }
        const expectedWorkingDays = attendanceMetrics.presentDays + attendanceMetrics.absentDays + attendanceMetrics.halfDays;
        if (expectedWorkingDays > 0) {
            attendanceMetrics.attendancePercentage = Number(((attendanceMetrics.presentDays + (attendanceMetrics.halfDays * 0.5)) / expectedWorkingDays * 100).toFixed(2));
        }
        const payloadHashSource = JSON.stringify({ employeeId, payrollPeriodId, timeMetrics, attendanceMetrics });
        const checksum = crypto.createHash('sha256').update(payloadHashSource).digest('hex');
        const result = {
            employeeId,
            payrollPeriodId,
            version: 1,
            generatedAt: new Date(),
            generatedById,
            sourceMusterIds: Array.from(sourceMusterIds),
            timeMetrics,
            attendanceMetrics,
            exceptionMetrics,
            leaveSummary,
            projectSiteSummary,
            checksum
        };
        return result;
    }
    async generateAndPersistSummary(employeeId, payrollPeriodId, generatedById, tx) {
        const result = await this.calculateSummary(employeeId, payrollPeriodId, generatedById, tx);
        const prev = await this.summaryRepo.findLatestByEmployeeAndPeriod(employeeId, payrollPeriodId, tx);
        const version = prev ? prev.version + 1 : 1;
        result.version = version;
        const summary = await this.summaryRepo.save({
            employeeId: result.employeeId,
            payrollPeriodId: result.payrollPeriodId,
            version: result.version,
            generatedAt: result.generatedAt,
            generatedById: result.generatedById,
            timeMetrics: result.timeMetrics,
            attendanceMetrics: result.attendanceMetrics,
            exceptionMetrics: result.exceptionMetrics,
            leaveSummary: result.leaveSummary,
            projectSiteSummary: result.projectSiteSummary,
            sourceMusterIds: result.sourceMusterIds,
            checksum: result.checksum
        }, tx);
        const eventName = version === 1 ? 'AttendanceSummaryGenerated' : 'AttendanceSummaryRegenerated';
        await this.eventBus.publish({
            eventId: (0, uuid_1.v4)(),
            eventName,
            payload: {
                summaryId: summary.id,
                employeeId,
                payrollPeriodId,
                version
            },
            timestamp: new Date(),
            version: 1
        });
        await this.eventBus.publish({
            eventId: (0, uuid_1.v4)(),
            eventName: 'AttendancePayrollSnapshotReady',
            payload: {
                summaryId: summary.id,
                employeeId,
                payrollPeriodId,
                payload: result
            },
            timestamp: new Date(),
            version: 1
        });
        return summary;
    }
};
exports.AttendanceCalculationService = AttendanceCalculationService;
exports.AttendanceCalculationService = AttendanceCalculationService = AttendanceCalculationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_bus_service_1.EventBusService,
        attendance_summary_repository_1.AttendanceSummaryRepository])
], AttendanceCalculationService);
//# sourceMappingURL=attendance-calculation.service.js.map