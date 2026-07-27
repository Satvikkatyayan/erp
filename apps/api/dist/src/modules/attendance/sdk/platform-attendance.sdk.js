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
exports.PlatformAttendanceSDK = void 0;
const common_1 = require("@nestjs/common");
const attendance_query_service_1 = require("../services/attendance-query.service");
let PlatformAttendanceSDK = class PlatformAttendanceSDK {
    constructor(queryService) {
        this.queryService = queryService;
    }
    async getAttendanceSummary(employeeId, payrollPeriodId) {
        const summary = await this.queryService.getAttendanceSummary(employeeId, payrollPeriodId);
        return {
            employeeId: summary.employeeId,
            payrollPeriodId: summary.payrollPeriodId,
            version: summary.version,
            generatedAt: summary.generatedAt,
            generatedById: summary.generatedById || undefined,
            sourceMusterIds: summary.sourceMusterIds,
            timeMetrics: summary.timeMetrics,
            attendanceMetrics: summary.attendanceMetrics,
            exceptionMetrics: summary.exceptionMetrics,
            leaveSummary: summary.leaveSummary,
            projectSiteSummary: summary.projectSiteSummary,
            checksum: summary.checksum || ''
        };
    }
    async getAttendanceMetrics(employeeId, payrollPeriodId) {
        return (await this.queryService.getAttendanceMetrics(employeeId, payrollPeriodId));
    }
    async getAttendanceHours(employeeId, payrollPeriodId) {
        return (await this.queryService.getAttendanceHours(employeeId, payrollPeriodId));
    }
    async getAttendanceLeaveSummary(employeeId, payrollPeriodId) {
        return (await this.queryService.getLeaveSummary(employeeId, payrollPeriodId));
    }
    async getAttendanceProjectSummary(employeeId, payrollPeriodId) {
        return (await this.queryService.getProjectSummary(employeeId, payrollPeriodId));
    }
};
exports.PlatformAttendanceSDK = PlatformAttendanceSDK;
exports.PlatformAttendanceSDK = PlatformAttendanceSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [attendance_query_service_1.AttendanceQueryService])
], PlatformAttendanceSDK);
//# sourceMappingURL=platform-attendance.sdk.js.map