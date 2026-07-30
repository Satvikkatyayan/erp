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
exports.PlatformEmployeeSDK = void 0;
const common_1 = require("@nestjs/common");
const employee_query_service_1 = require("../services/employee-query.service");
let PlatformEmployeeSDK = class PlatformEmployeeSDK {
    constructor(queryService) {
        this.queryService = queryService;
    }
    async getEmployeeProfile(tenantId, employeeId) {
        const raw = await this.queryService.findEmployeeById(tenantId, employeeId);
        if (!raw)
            return null;
        return {
            id: raw.id,
            tenantId: raw.tenantId,
            organizationId: raw.organizationId,
            employeeNumber: raw.employeeNumber,
            status: raw.status,
            personalDetails: raw.personalDetails
        };
    }
    async getEmployeeSummary(tenantId, employeeId) {
        const raw = await this.queryService.findEmployeeSummary(tenantId, employeeId);
        if (!raw)
            return null;
        return {
            id: raw.id,
            employeeNumber: raw.employeeNumber,
            status: raw.status
        };
    }
    async getEmploymentStatus(tenantId, employeeId) {
        return this.queryService.findEmploymentStatus(tenantId, employeeId);
    }
    async isEmployeeActive(tenantId, employeeId) {
        return this.queryService.isEmployeeActive(tenantId, employeeId);
    }
    async exists(tenantId, employeeId) {
        return this.queryService.exists(tenantId, employeeId);
    }
    async getCurrentAssignment(tenantId, employeeId) {
        const raw = await this.queryService.findEmployeeJobAssignment(tenantId, employeeId);
        if (!raw)
            return null;
        return {
            id: raw.id,
            employeeId: raw.employeeId,
            departmentId: raw.departmentId,
            designationId: raw.designationId,
            managerId: raw.managerId,
            projectId: raw.projectId,
            branchId: raw.branchId,
            effectiveFrom: raw.effectiveFrom,
            effectiveTo: raw.effectiveTo
        };
    }
    async getCurrentDepartment(tenantId, employeeId) {
        return this.queryService.findCurrentDepartment(tenantId, employeeId);
    }
    async getCurrentDesignation(tenantId, employeeId) {
        return this.queryService.findCurrentDesignation(tenantId, employeeId);
    }
    async getCurrentManager(tenantId, employeeId) {
        return this.queryService.findCurrentManager(tenantId, employeeId);
    }
    async getCurrentProject(tenantId, employeeId) {
        return this.queryService.findCurrentProject(tenantId, employeeId);
    }
    async getAssignmentHistory(tenantId, employeeId) {
        const rawList = await this.queryService.findAssignmentHistory(tenantId, employeeId);
        return rawList.map(raw => ({
            id: raw.id,
            employeeId: raw.employeeId,
            departmentId: raw.departmentId,
            designationId: raw.designationId,
            managerId: raw.managerId,
            projectId: raw.projectId,
            branchId: raw.branchId,
            effectiveFrom: raw.effectiveFrom,
            effectiveTo: raw.effectiveTo
        }));
    }
    async getTimeline(tenantId, employeeId) {
        const rawList = await this.queryService.findTimeline(tenantId, employeeId);
        return rawList.map(raw => ({
            id: raw.id,
            eventType: raw.eventType,
            eventDate: raw.eventDate,
            metadata: raw.metadata
        }));
    }
    async searchEmployees(tenantId, filters) {
        const rawList = await this.queryService.searchEmployees(tenantId, filters);
        return rawList.map(raw => ({
            id: raw.id,
            employeeNumber: raw.employeeNumber,
            status: raw.status
        }));
    }
    async getEmployeesByManager(tenantId, managerId) {
        const rawList = await this.queryService.findEmployeesByManager(tenantId, managerId);
        return rawList.map(raw => ({
            id: raw.id,
            employeeNumber: raw.employeeNumber,
            status: raw.status
        }));
    }
    async getEmployeesByDepartment(tenantId, departmentId) {
        const rawList = await this.queryService.findEmployeesByDepartment(tenantId, departmentId);
        return rawList.map(raw => ({
            id: raw.id,
            employeeNumber: raw.employeeNumber,
            status: raw.status
        }));
    }
    async getEmployeesByProject(tenantId, projectId) {
        const rawList = await this.queryService.findEmployeesByProject(tenantId, projectId);
        return rawList.map(raw => ({
            id: raw.id,
            employeeNumber: raw.employeeNumber,
            status: raw.status
        }));
    }
    async getEmployeesByOrganization(tenantId, organizationId) {
        const rawList = await this.queryService.findEmployeesByOrganization(tenantId, organizationId);
        return rawList.map(raw => ({
            id: raw.id,
            employeeNumber: raw.employeeNumber,
            status: raw.status
        }));
    }
    async getEmployeesByBranch(tenantId, branchId) {
        const rawList = await this.queryService.findEmployeesByBranch(tenantId, branchId);
        return rawList.map(raw => ({
            id: raw.id,
            employeeNumber: raw.employeeNumber,
            status: raw.status
        }));
    }
    async getJoiningDate(tenantId, employeeId) {
        return this.queryService.findJoiningDate(tenantId, employeeId);
    }
    async getConfirmationStatus(tenantId, employeeId) {
        return this.queryService.findConfirmationStatus(tenantId, employeeId);
    }
    async isOnProbation(tenantId, employeeId) {
        return this.queryService.isOnProbation(tenantId, employeeId);
    }
    async hasCompletedProbation(tenantId, employeeId) {
        return this.queryService.hasCompletedProbation(tenantId, employeeId);
    }
    async isExited(tenantId, employeeId) {
        return this.queryService.isExited(tenantId, employeeId);
    }
    async getExitInformation(tenantId, employeeId) {
        return this.queryService.findExitInformation(tenantId, employeeId);
    }
    async validateEmployee(tenantId, employeeId) {
        const exists = await this.exists(tenantId, employeeId);
        if (!exists) {
            throw new Error(`Employee with ID ${employeeId} not found in tenant ${tenantId}.`);
        }
    }
    async validateActiveEmployee(tenantId, employeeId) {
        const isActive = await this.isEmployeeActive(tenantId, employeeId);
        if (!isActive) {
            throw new Error(`Employee with ID ${employeeId} is not active in tenant ${tenantId}.`);
        }
    }
    async getTeamScopeIds(ctx, employeeId, allowIndirect, maxDepth) {
        return this.queryService.getTeamScopeIds(ctx, employeeId, allowIndirect, maxDepth);
    }
};
exports.PlatformEmployeeSDK = PlatformEmployeeSDK;
exports.PlatformEmployeeSDK = PlatformEmployeeSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_query_service_1.EmployeeQueryService])
], PlatformEmployeeSDK);
//# sourceMappingURL=platform-employee.sdk.js.map