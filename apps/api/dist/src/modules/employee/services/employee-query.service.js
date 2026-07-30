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
exports.EmployeeQueryService = void 0;
const common_1 = require("@nestjs/common");
const employee_repository_1 = require("../repositories/employee.repository");
const job_assignment_repository_1 = require("../repositories/job-assignment.repository");
const timeline_repository_1 = require("../repositories/timeline.repository");
let EmployeeQueryService = class EmployeeQueryService {
    constructor(employeeRepo, jobAssignmentRepo, timelineRepo) {
        this.employeeRepo = employeeRepo;
        this.jobAssignmentRepo = jobAssignmentRepo;
        this.timelineRepo = timelineRepo;
    }
    async findEmployeeById(tenantId, employeeId) {
        return this.employeeRepo.findEmployeeById(tenantId, employeeId);
    }
    async findEmployeeSummary(tenantId, employeeId) {
        return this.employeeRepo.findEmployeeById(tenantId, employeeId);
    }
    async findEmploymentStatus(tenantId, employeeId) {
        const emp = await this.employeeRepo.findEmployeeById(tenantId, employeeId);
        return emp ? emp.status : null;
    }
    async isEmployeeActive(tenantId, employeeId) {
        const status = await this.findEmploymentStatus(tenantId, employeeId);
        return ['JOINED', 'PROBATION', 'CONFIRMED', 'NOTICE_PERIOD'].includes(status || '');
    }
    async exists(tenantId, employeeId) {
        return this.employeeRepo.exists(tenantId, employeeId);
    }
    async findEmployeeJobAssignment(tenantId, employeeId) {
        return this.jobAssignmentRepo.findCurrentJobAssignment(tenantId, employeeId);
    }
    async findCurrentDepartment(tenantId, employeeId) {
        const assign = await this.findEmployeeJobAssignment(tenantId, employeeId);
        return assign ? assign.departmentId : null;
    }
    async findCurrentDesignation(tenantId, employeeId) {
        const assign = await this.findEmployeeJobAssignment(tenantId, employeeId);
        return assign ? assign.designationId : null;
    }
    async findCurrentManager(tenantId, employeeId) {
        const assign = await this.findEmployeeJobAssignment(tenantId, employeeId);
        return assign ? assign.managerId : null;
    }
    async findCurrentProject(tenantId, employeeId) {
        const assign = await this.findEmployeeJobAssignment(tenantId, employeeId);
        return assign ? assign.projectId : null;
    }
    async findAssignmentHistory(tenantId, employeeId) {
        return this.jobAssignmentRepo.findAssignmentHistory(tenantId, employeeId);
    }
    async findTimeline(tenantId, employeeId) {
        return this.timelineRepo.getTimeline(tenantId, employeeId);
    }
    async searchEmployees(tenantId, filters, sort) {
        return this.employeeRepo.searchEmployees(tenantId, filters, sort);
    }
    async findEmployeesByManager(tenantId, managerId, filters, sort) {
        return this.employeeRepo.findEmployeesByManager(tenantId, managerId, filters, sort);
    }
    async findEmployeesByDepartment(tenantId, departmentId, filters, sort) {
        return this.employeeRepo.findEmployeesByDepartment(tenantId, departmentId, filters, sort);
    }
    async findEmployeesByProject(tenantId, projectId, filters, sort) {
        return this.employeeRepo.findEmployeesByProject(tenantId, projectId, filters, sort);
    }
    async findEmployeesByOrganization(tenantId, organizationId, filters, sort) {
        return this.employeeRepo.findEmployeesByOrganization(tenantId, organizationId, filters, sort);
    }
    async findEmployeesByBranch(tenantId, branchId, filters, sort) {
        return this.employeeRepo.findEmployeesByBranch(tenantId, branchId, filters, sort);
    }
    async findJoiningDate(tenantId, employeeId) {
        const timeline = await this.findTimeline(tenantId, employeeId);
        const joinEvent = timeline.find((t) => t.eventType === 'JOINED' || t.eventType === 'ONBOARDED');
        return joinEvent ? joinEvent.eventDate : null;
    }
    async findConfirmationStatus(tenantId, employeeId) {
        const status = await this.findEmploymentStatus(tenantId, employeeId);
        return status === 'CONFIRMED';
    }
    async isOnProbation(tenantId, employeeId) {
        const status = await this.findEmploymentStatus(tenantId, employeeId);
        return status === 'PROBATION';
    }
    async hasCompletedProbation(tenantId, employeeId) {
        const status = await this.findEmploymentStatus(tenantId, employeeId);
        return ['CONFIRMED', 'NOTICE_PERIOD', 'EXITED', 'TERMINATED'].includes(status || '');
    }
    async isExited(tenantId, employeeId) {
        const status = await this.findEmploymentStatus(tenantId, employeeId);
        return ['EXITED', 'TERMINATED'].includes(status || '');
    }
    async findExitInformation(tenantId, employeeId) {
        const timeline = await this.findTimeline(tenantId, employeeId);
        const exitEvent = timeline.find((t) => t.eventType === 'EXITED' || t.eventType === 'TERMINATED' || t.eventType === 'RESIGNED');
        return exitEvent ? exitEvent.metadata : null;
    }
    async getTeamScopeIds(ctx, employeeId, allowIndirect, maxDepth) {
        return [employeeId];
    }
};
exports.EmployeeQueryService = EmployeeQueryService;
exports.EmployeeQueryService = EmployeeQueryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_repository_1.EmpEmployeeRepository,
        job_assignment_repository_1.EmpJobAssignmentRepository,
        timeline_repository_1.EmpEmployeeTimelineRepository])
], EmployeeQueryService);
//# sourceMappingURL=employee-query.service.js.map