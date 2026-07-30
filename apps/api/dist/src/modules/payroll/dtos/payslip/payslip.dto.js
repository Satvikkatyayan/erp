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
exports.PayslipResponseDto = exports.PayslipReviewDto = exports.PayslipAuditDto = exports.PayslipTotalsDto = exports.PayslipComponentDto = exports.PayslipAttendanceDto = exports.PayslipEmployeeDto = exports.PayslipCompanyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PayslipCompanyDto {
}
exports.PayslipCompanyDto = PayslipCompanyDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipCompanyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipCompanyDto.prototype, "businessUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipCompanyDto.prototype, "branch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipCompanyDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipCompanyDto.prototype, "payrollPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipCompanyDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipCompanyDto.prototype, "payDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipCompanyDto.prototype, "runNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipCompanyDto.prototype, "payslipVersion", void 0);
class PayslipEmployeeDto {
}
exports.PayslipEmployeeDto = PayslipEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipEmployeeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipEmployeeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipEmployeeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipEmployeeDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipEmployeeDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipEmployeeDto.prototype, "branch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipEmployeeDto.prototype, "employmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipEmployeeDto.prototype, "joiningDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipEmployeeDto.prototype, "salaryStructureVersion", void 0);
class PayslipAttendanceDto {
}
exports.PayslipAttendanceDto = PayslipAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipAttendanceDto.prototype, "daysPresent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipAttendanceDto.prototype, "daysAbsent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipAttendanceDto.prototype, "paidLeave", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipAttendanceDto.prototype, "unpaidLeave", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipAttendanceDto.prototype, "halfDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipAttendanceDto.prototype, "lateDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipAttendanceDto.prototype, "overtimeHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipAttendanceDto.prototype, "attendancePercentage", void 0);
class PayslipComponentDto {
}
exports.PayslipComponentDto = PayslipComponentDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipComponentDto.prototype, "component", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipComponentDto.prototype, "formulaVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipComponentDto.prototype, "calculatedValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PayslipComponentDto.prototype, "currency", void 0);
class PayslipTotalsDto {
}
exports.PayslipTotalsDto = PayslipTotalsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipTotalsDto.prototype, "grossEarnings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipTotalsDto.prototype, "grossDeductions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipTotalsDto.prototype, "employerContributions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipTotalsDto.prototype, "netPay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipTotalsDto.prototype, "roundedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipTotalsDto.prototype, "amountInWords", void 0);
class PayslipAuditDto {
}
exports.PayslipAuditDto = PayslipAuditDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipAuditDto.prototype, "calculationVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipAuditDto.prototype, "snapshotVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipAuditDto.prototype, "rulesVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipAuditDto.prototype, "checksum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipAuditDto.prototype, "formulaHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipAuditDto.prototype, "runId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipAuditDto.prototype, "calculationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipAuditDto.prototype, "payslipId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipAuditDto.prototype, "generatedTimestamp", void 0);
class PayslipReviewDto {
}
exports.PayslipReviewDto = PayslipReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PayslipReviewDto.prototype, "approvedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PayslipReviewDto.prototype, "approvalWorkflowVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PayslipReviewDto.prototype, "finalReviewer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PayslipReviewDto.prototype, "approvedTimestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PayslipReviewDto.prototype, "lockedTimestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PayslipReviewDto.prototype, "processedTimestamp", void 0);
class PayslipResponseDto {
}
exports.PayslipResponseDto = PayslipResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipResponseDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayslipResponseDto.prototype, "versionNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PayslipResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PayslipResponseDto.prototype, "documentUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => PayslipCompanyDto }),
    __metadata("design:type", PayslipCompanyDto)
], PayslipResponseDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => PayslipEmployeeDto }),
    __metadata("design:type", PayslipEmployeeDto)
], PayslipResponseDto.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => PayslipAttendanceDto }),
    __metadata("design:type", PayslipAttendanceDto)
], PayslipResponseDto.prototype, "attendanceSummary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [PayslipComponentDto] }),
    __metadata("design:type", Array)
], PayslipResponseDto.prototype, "earnings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [PayslipComponentDto] }),
    __metadata("design:type", Array)
], PayslipResponseDto.prototype, "deductions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [PayslipComponentDto] }),
    __metadata("design:type", Array)
], PayslipResponseDto.prototype, "employerContributions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => PayslipTotalsDto }),
    __metadata("design:type", PayslipTotalsDto)
], PayslipResponseDto.prototype, "totals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => PayslipAuditDto }),
    __metadata("design:type", PayslipAuditDto)
], PayslipResponseDto.prototype, "auditMetadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => PayslipReviewDto }),
    __metadata("design:type", PayslipReviewDto)
], PayslipResponseDto.prototype, "reviewMetadata", void 0);
//# sourceMappingURL=payslip.dto.js.map