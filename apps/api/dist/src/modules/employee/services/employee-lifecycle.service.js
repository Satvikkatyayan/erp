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
exports.EmployeeLifecycleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const employee_bootstrap_service_1 = require("./employee-bootstrap.service");
const employee_validation_service_1 = require("./employee-validation.service");
let EmployeeLifecycleService = class EmployeeLifecycleService {
    constructor(prisma, sdk, bootstrap, validator) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.bootstrap = bootstrap;
        this.validator = validator;
    }
    async onboardEmployee(ctx, payload) {
        await this.validator.validateNewHire(ctx, payload);
        const empNo = payload.employeeNumber || `EMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const employee = await this.prisma.empEmployee.create({
            data: {
                tenantId: ctx.tenantId,
                organizationId: ctx.organizationId,
                employeeNumber: empNo,
                status: 'JOINED',
                personalDetails: {
                    create: {
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                    }
                },
                jobAssignments: {
                    create: {
                        positionId: payload.positionId,
                        departmentId: payload.departmentId,
                        branchId: payload.branchId,
                        effectiveFrom: payload.joiningDate
                    }
                }
            }
        });
        await this.sdk.events.publish(ctx, 'EmployeeCreated', { employeeId: employee.id });
        await this.bootstrap.provisionDownstreamProfiles(ctx, employee.id);
        return employee;
    }
    async updateEmployee(ctx, employeeId, payload) {
        await this.sdk.events.publish(ctx, 'EmployeeUpdated', { employeeId, payload });
    }
    async transferEmployee(ctx, employeeId, payload) {
        await this.sdk.events.publish(ctx, 'EmployeeTransferred', { employeeId, payload });
    }
    async promoteEmployee(ctx, employeeId, payload) {
        await this.sdk.events.publish(ctx, 'EmployeePromoted', { employeeId, payload });
    }
    async confirmEmployee(ctx, employeeId) {
        await this.sdk.events.publish(ctx, 'EmployeeConfirmed', { employeeId });
    }
    async suspendEmployee(ctx, employeeId) {
        await this.sdk.events.publish(ctx, 'EmployeeSuspended', { employeeId });
    }
    async terminateEmployee(ctx, employeeId) {
        await this.sdk.events.publish(ctx, 'EmployeeTerminated', { employeeId });
    }
    async assignManager(ctx, employeeId, managerId) {
        await this.sdk.events.publish(ctx, 'ManagerAssigned', { employeeId, managerId });
    }
    async markDocumentExpired(ctx, employeeId, documentId) {
        await this.sdk.events.publish(ctx, 'DocumentExpired', { employeeId, documentId });
    }
    async completeProbation(ctx, employeeId) {
        await this.sdk.events.publish(ctx, 'ProbationCompleted', { employeeId });
    }
};
exports.EmployeeLifecycleService = EmployeeLifecycleService;
exports.EmployeeLifecycleService = EmployeeLifecycleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        employee_bootstrap_service_1.EmployeeBootstrapService,
        employee_validation_service_1.EmployeeValidationService])
], EmployeeLifecycleService);
//# sourceMappingURL=employee-lifecycle.service.js.map