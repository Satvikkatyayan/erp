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
exports.EmployeeExecutionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const employee_repository_1 = require("../repositories/employee.repository");
const job_assignment_repository_1 = require("../repositories/job-assignment.repository");
const timeline_repository_1 = require("../repositories/timeline.repository");
const snapshot_repository_1 = require("../repositories/snapshot.repository");
const execution_result_1 = require("../../../core/cqrs/execution-result");
const employee_events_1 = require("../events/employee.events");
let EmployeeExecutionService = class EmployeeExecutionService {
    constructor(prisma, sdk, employeeRepo, jobAssignmentRepo, timelineRepo, snapshotRepo) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.employeeRepo = employeeRepo;
        this.jobAssignmentRepo = jobAssignmentRepo;
        this.timelineRepo = timelineRepo;
        this.snapshotRepo = snapshotRepo;
    }
    async onboardEmployee(command) {
        return this.prisma.$transaction(async (tx) => {
            const employee = await this.employeeRepo.createEmployee(command.tenantId, 'default-org', 'EMP-TEMP', 'DRAFT', tx);
            const assignment = await this.jobAssignmentRepo.createJobAssignment(command.tenantId, employee.id, command.data, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, employee.id, 'ONBOARDED', { data: command.data }, tx);
            const snapshotPayload = { employee, assignment };
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, employee.id, snapshotPayload, tx);
            const events = [
                new employee_events_1.EmployeeCreatedEvent(employee.id, command.tenantId),
                new employee_events_1.EmployeeTimelineCreatedEvent(employee.id, command.tenantId),
                new employee_events_1.EmployeeSnapshotCreatedEvent(employee.id, command.tenantId),
                new employee_events_1.WelcomeMailRequestedEvent(employee.id, command.tenantId)
            ];
            return new execution_result_1.ExecutionResult({ employee, assignment, timeline, snapshot }, events);
        });
    }
    async joinEmployee(command) {
        return this.prisma.$transaction(async (tx) => {
            let employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            if (employee.status !== 'DRAFT' && employee.status !== 'EXITED' && employee.status !== 'TERMINATED') {
                throw new Error(`Cannot join employee from status ${employee.status}`);
            }
            await this.employeeRepo.updateEmployeeStatus(command.tenantId, command.employeeId, 'JOINED', tx);
            employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            const assignment = await this.jobAssignmentRepo.getCurrentJobAssignment(command.tenantId, command.employeeId, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, command.employeeId, 'JOINED', {}, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, command.employeeId, { employee, assignment }, tx);
            const events = [
                new employee_events_1.EmployeeJoinedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
            ];
            return new execution_result_1.ExecutionResult({ employee, assignment, timeline, snapshot }, events);
        });
    }
    async beginProbation(command) {
        return this.prisma.$transaction(async (tx) => {
            let employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            if (employee.status !== 'JOINED') {
                throw new Error(`Cannot start probation for employee from status ${employee.status}`);
            }
            await this.employeeRepo.updateEmployeeStatus(command.tenantId, command.employeeId, 'PROBATION', tx);
            employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            const assignment = await this.jobAssignmentRepo.getCurrentJobAssignment(command.tenantId, command.employeeId, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, command.employeeId, 'PROBATION_STARTED', {}, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, command.employeeId, { employee, assignment }, tx);
            const events = [
                new employee_events_1.EmployeeProbationStartedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
            ];
            return new execution_result_1.ExecutionResult({ employee, assignment, timeline, snapshot }, events);
        });
    }
    async confirmEmployee(command) {
        return this.prisma.$transaction(async (tx) => {
            let employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            if (employee.status !== 'PROBATION') {
                throw new Error(`Cannot confirm employee who is not on probation (current status: ${employee.status})`);
            }
            await this.employeeRepo.updateEmployeeStatus(command.tenantId, command.employeeId, 'CONFIRMED', tx);
            employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            const assignment = await this.jobAssignmentRepo.getCurrentJobAssignment(command.tenantId, command.employeeId, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, command.employeeId, 'CONFIRMED', { confirmedBy: command.confirmedBy, confirmedAt: command.confirmedAt }, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, command.employeeId, { employee, assignment }, tx);
            const events = [
                new employee_events_1.EmployeeConfirmedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
            ];
            return new execution_result_1.ExecutionResult({ employee, assignment, timeline, snapshot }, events);
        });
    }
    async transferEmployee(command) {
        return this.prisma.$transaction(async (tx) => {
            const employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            if (['EXITED', 'TERMINATED', 'DRAFT'].includes(employee.status)) {
                throw new Error(`Cannot transfer employee in status ${employee.status}`);
            }
            const now = new Date();
            await this.jobAssignmentRepo.closeCurrentJobAssignment(command.tenantId, command.employeeId, now, tx);
            const assignment = await this.jobAssignmentRepo.createJobAssignment(command.tenantId, command.employeeId, command.newAssignmentData, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, command.employeeId, 'TRANSFERRED', { newAssignmentData: command.newAssignmentData }, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, command.employeeId, { employee, assignment }, tx);
            const events = [
                new employee_events_1.EmployeeTransferredEvent(command.employeeId, command.tenantId, assignment.id),
                new employee_events_1.EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
            ];
            return new execution_result_1.ExecutionResult({ employee, assignment, timeline, snapshot }, events);
        });
    }
    async promoteEmployee(command) {
        return this.prisma.$transaction(async (tx) => {
            const employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            if (['EXITED', 'TERMINATED', 'DRAFT'].includes(employee.status)) {
                throw new Error(`Cannot promote employee in status ${employee.status}`);
            }
            const now = new Date();
            await this.jobAssignmentRepo.closeCurrentJobAssignment(command.tenantId, command.employeeId, now, tx);
            const assignment = await this.jobAssignmentRepo.createJobAssignment(command.tenantId, command.employeeId, command.newAssignmentData, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, command.employeeId, 'PROMOTED', { newAssignmentData: command.newAssignmentData }, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, command.employeeId, { employee, assignment }, tx);
            const events = [
                new employee_events_1.EmployeePromotedEvent(command.employeeId, command.tenantId, assignment.positionId),
                new employee_events_1.EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
            ];
            return new execution_result_1.ExecutionResult({ employee, assignment, timeline, snapshot }, events);
        });
    }
    async resignEmployee(command) {
        return this.prisma.$transaction(async (tx) => {
            let employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            if (['EXITED', 'TERMINATED', 'DRAFT'].includes(employee.status)) {
                throw new Error(`Cannot resign employee in status ${employee.status}`);
            }
            await this.employeeRepo.updateEmployeeStatus(command.tenantId, command.employeeId, 'NOTICE_PERIOD', tx);
            employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            const assignment = await this.jobAssignmentRepo.getCurrentJobAssignment(command.tenantId, command.employeeId, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, command.employeeId, 'RESIGNED', { resignationDate: command.resignationDate }, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, command.employeeId, { employee, assignment }, tx);
            const events = [
                new employee_events_1.EmployeeResignedEvent(command.employeeId, command.tenantId, command.resignationDate),
                new employee_events_1.EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
            ];
            return new execution_result_1.ExecutionResult({ employee, assignment, timeline, snapshot }, events);
        });
    }
    async terminateEmployee(command) {
        return this.prisma.$transaction(async (tx) => {
            let employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            if (employee.status === 'EXITED' || employee.status === 'TERMINATED') {
                throw new Error(`Employee is already exited or terminated`);
            }
            await this.employeeRepo.updateEmployeeStatus(command.tenantId, command.employeeId, 'TERMINATED', tx);
            employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            const now = new Date(command.terminationDate);
            await this.jobAssignmentRepo.closeCurrentJobAssignment(command.tenantId, command.employeeId, now, tx);
            const assignment = await this.jobAssignmentRepo.getCurrentJobAssignment(command.tenantId, command.employeeId, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, command.employeeId, 'TERMINATED', { terminationDate: command.terminationDate }, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, command.employeeId, { employee, assignment }, tx);
            const events = [
                new employee_events_1.EmployeeTerminatedEvent(command.employeeId, command.tenantId, command.terminationDate),
                new employee_events_1.EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
            ];
            return new execution_result_1.ExecutionResult({ employee, assignment, timeline, snapshot }, events);
        });
    }
    async exitEmployee(command) {
        return this.prisma.$transaction(async (tx) => {
            let employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            if (employee.status === 'EXITED') {
                throw new Error(`Employee is already exited`);
            }
            await this.employeeRepo.updateEmployeeStatus(command.tenantId, command.employeeId, 'EXITED', tx);
            employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            const now = new Date(command.exitDate);
            await this.jobAssignmentRepo.closeCurrentJobAssignment(command.tenantId, command.employeeId, now, tx);
            const assignment = await this.jobAssignmentRepo.getCurrentJobAssignment(command.tenantId, command.employeeId, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, command.employeeId, 'EXITED', { exitDate: command.exitDate }, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, command.employeeId, { employee, assignment }, tx);
            const events = [
                new employee_events_1.EmployeeExitedEvent(command.employeeId, command.tenantId, command.exitDate),
                new employee_events_1.EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
            ];
            return new execution_result_1.ExecutionResult({ employee, assignment, timeline, snapshot }, events);
        });
    }
    async rehireEmployee(command) {
        return this.prisma.$transaction(async (tx) => {
            let employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            if (employee.status !== 'EXITED' && employee.status !== 'TERMINATED') {
                throw new Error(`Cannot rehire employee who is not exited or terminated`);
            }
            await this.employeeRepo.updateEmployeeStatus(command.tenantId, command.employeeId, 'JOINED', tx);
            employee = await this.employeeRepo.getEmployeeById(command.tenantId, command.employeeId, tx);
            const assignment = await this.jobAssignmentRepo.createJobAssignment(command.tenantId, command.employeeId, command.initialAssignmentData, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, command.employeeId, 'REHIRED', { initialAssignmentData: command.initialAssignmentData }, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, command.employeeId, { employee, assignment }, tx);
            const events = [
                new employee_events_1.EmployeeRehiredEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
                new employee_events_1.EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
            ];
            return new execution_result_1.ExecutionResult({ employee, assignment, timeline, snapshot }, events);
        });
    }
};
exports.EmployeeExecutionService = EmployeeExecutionService;
exports.EmployeeExecutionService = EmployeeExecutionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        employee_repository_1.EmpEmployeeRepository,
        job_assignment_repository_1.EmpJobAssignmentRepository,
        timeline_repository_1.EmpEmployeeTimelineRepository,
        snapshot_repository_1.EmpEmployeeSnapshotRepository])
], EmployeeExecutionService);
//# sourceMappingURL=employee-execution.service.js.map