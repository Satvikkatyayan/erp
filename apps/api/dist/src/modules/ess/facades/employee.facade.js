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
var EmployeeFacade_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeFacade = void 0;
const common_1 = require("@nestjs/common");
const attendance_query_service_1 = require("../../attendance/services/attendance-query.service");
const leave_query_service_1 = require("../../leave/services/leave-query.service");
const payroll_query_service_1 = require("../../payroll/services/payroll-query.service");
const asset_query_service_1 = require("../../assets/services/asset-query.service");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let EmployeeFacade = EmployeeFacade_1 = class EmployeeFacade {
    constructor(prisma, attendanceQuery, leaveQuery, payrollQuery, assetQuery) {
        this.prisma = prisma;
        this.attendanceQuery = attendanceQuery;
        this.leaveQuery = leaveQuery;
        this.payrollQuery = payrollQuery;
        this.assetQuery = assetQuery;
        this.logger = new common_1.Logger(EmployeeFacade_1.name);
    }
    async getEmployeeProfile(ctx) {
        this.logger.debug(`Fetching profile for user ${ctx.userId}`);
        const employee = await this.prisma.empEmployee.findUnique({
            where: { userId: ctx.userId },
            include: {
                personalDetails: true,
                jobAssignments: {
                    where: { effectiveTo: null },
                    include: {
                        position: true
                    }
                }
            }
        });
        if (!employee) {
            throw new Error('Employee profile not found');
        }
        return {
            employeeId: employee.id,
            employeeNumber: employee.employeeNumber,
            firstName: employee.personalDetails?.firstName,
            lastName: employee.personalDetails?.lastName,
            jobTitle: employee.jobAssignments[0]?.position?.title || 'N/A'
        };
    }
    async getLeaveBalances(ctx) {
        return this.leaveQuery.getLeaveBalances(ctx.tenantId, ctx.employeeId);
    }
    async getAttendanceHistory(ctx) {
        return this.attendanceQuery.getHistory(ctx);
    }
    async getAssignedAssets(ctx) {
        return this.assetQuery.getAssignedAssets(ctx);
    }
    async getPayslips(ctx) {
        return this.payrollQuery.getPayslips(ctx);
    }
};
exports.EmployeeFacade = EmployeeFacade;
exports.EmployeeFacade = EmployeeFacade = EmployeeFacade_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        attendance_query_service_1.AttendanceQueryService,
        leave_query_service_1.LeaveQueryService,
        payroll_query_service_1.PayrollQueryService,
        asset_query_service_1.AssetQueryService])
], EmployeeFacade);
//# sourceMappingURL=employee.facade.js.map