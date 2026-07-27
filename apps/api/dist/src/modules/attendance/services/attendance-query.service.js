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
var AttendanceQueryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceQueryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const attendance_summary_repository_1 = require("../repositories/attendance-summary.repository");
let AttendanceQueryService = AttendanceQueryService_1 = class AttendanceQueryService {
    constructor(prisma, summaryRepo) {
        this.prisma = prisma;
        this.summaryRepo = summaryRepo;
        this.logger = new common_1.Logger(AttendanceQueryService_1.name);
    }
    async getAttendanceSummary(employeeId, payrollPeriodId) {
        const summary = await this.summaryRepo.findLatestByEmployeeAndPeriod(employeeId, payrollPeriodId);
        if (!summary) {
            throw new common_1.NotFoundException(`No attendance summary found for employee ${employeeId} in period ${payrollPeriodId}`);
        }
        return summary;
    }
    async getAttendanceMetrics(employeeId, payrollPeriodId) {
        const summary = await this.getAttendanceSummary(employeeId, payrollPeriodId);
        return summary.attendanceMetrics;
    }
    async getAttendanceHours(employeeId, payrollPeriodId) {
        const summary = await this.getAttendanceSummary(employeeId, payrollPeriodId);
        return summary.timeMetrics;
    }
    async getLeaveSummary(employeeId, payrollPeriodId) {
        const summary = await this.getAttendanceSummary(employeeId, payrollPeriodId);
        return summary.leaveSummary;
    }
    async getProjectSummary(employeeId, payrollPeriodId) {
        const summary = await this.getAttendanceSummary(employeeId, payrollPeriodId);
        return summary.projectSiteSummary;
    }
    async getSiteSummary(employeeId, payrollPeriodId) {
        const summary = await this.getAttendanceSummary(employeeId, payrollPeriodId);
        return summary.projectSiteSummary;
    }
    async getTodaySummary(ctx) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.prisma.attendanceDay.findFirst({
            where: {
                employeeId: ctx.userId,
                muster: {
                    musterDate: today
                }
            }
        });
    }
    async getHistory(ctx, limit = 10) {
        return this.prisma.attendanceDay.findMany({
            where: { employeeId: ctx.userId },
            orderBy: { muster: { musterDate: 'desc' } },
            take: limit
        });
    }
};
exports.AttendanceQueryService = AttendanceQueryService;
exports.AttendanceQueryService = AttendanceQueryService = AttendanceQueryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        attendance_summary_repository_1.AttendanceSummaryRepository])
], AttendanceQueryService);
//# sourceMappingURL=attendance-query.service.js.map