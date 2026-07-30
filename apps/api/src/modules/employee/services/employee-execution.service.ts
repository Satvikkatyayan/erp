import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { EmpEmployeeRepository } from '../repositories/employee.repository';
import { EmpJobAssignmentRepository } from '../repositories/job-assignment.repository';
import { EmpEmployeeTimelineRepository } from '../repositories/timeline.repository';
import { EmpEmployeeSnapshotRepository } from '../repositories/snapshot.repository';
import { ExecutionResult } from '../../../core/cqrs/execution-result';
import {
  EmployeeCreatedEvent,
  EmployeeJoinedEvent,
  EmployeeProbationStartedEvent,
  EmployeeConfirmedEvent,
  EmployeeTransferredEvent,
  EmployeePromotedEvent,
  EmployeeResignedEvent,
  EmployeeTerminatedEvent,
  EmployeeExitedEvent,
  EmployeeRehiredEvent,
  EmployeeTimelineCreatedEvent,
  EmployeeSnapshotCreatedEvent,
  WelcomeMailRequestedEvent
} from '../events/employee.events';

import { OnboardEmployeeCommand } from '../commands/onboard-employee.command';
import { ConfirmEmployeeCommand } from '../commands/confirm-employee.command';
import { JoinEmployeeCommand } from '../commands/join-employee.command';
import { BeginProbationCommand } from '../commands/begin-probation.command';
import { TransferEmployeeCommand } from '../commands/transfer-employee.command';
import { PromoteEmployeeCommand } from '../commands/promote-employee.command';
import { ResignEmployeeCommand } from '../commands/resign-employee.command';
import { TerminateEmployeeCommand } from '../commands/terminate-employee.command';
import { ExitEmployeeCommand } from '../commands/exit-employee.command';
import { RehireEmployeeCommand } from '../commands/rehire-employee.command';

@Injectable()
export class EmployeeExecutionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly employeeRepo: EmpEmployeeRepository,
    private readonly jobAssignmentRepo: EmpJobAssignmentRepository,
    private readonly timelineRepo: EmpEmployeeTimelineRepository,
    private readonly snapshotRepo: EmpEmployeeSnapshotRepository
  ) {}

  async onboardEmployee(command: OnboardEmployeeCommand): Promise<ExecutionResult<any>> {
    return this.prisma.$transaction(async (tx) => {
      const employee = await this.employeeRepo.createEmployee(command.tenantId, 'default-org', 'EMP-TEMP', 'DRAFT', tx);
      const assignment = await this.jobAssignmentRepo.createJobAssignment(command.tenantId, employee.id, command.data, tx);
      const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, employee.id, 'ONBOARDED', { data: command.data }, tx);
      
      const snapshotPayload = { employee, assignment };
      const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, employee.id, snapshotPayload, tx);

      const events = [
        new EmployeeCreatedEvent(employee.id, command.tenantId),
        new EmployeeTimelineCreatedEvent(employee.id, command.tenantId),
        new EmployeeSnapshotCreatedEvent(employee.id, command.tenantId),
        new WelcomeMailRequestedEvent(employee.id, command.tenantId)
      ];
      
      return new ExecutionResult({ employee, assignment, timeline, snapshot }, events);
    });
  }

  async joinEmployee(command: JoinEmployeeCommand): Promise<ExecutionResult<any>> {
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
        new EmployeeJoinedEvent(command.employeeId, command.tenantId),
        new EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
        new EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
      ];
      
      return new ExecutionResult({ employee, assignment, timeline, snapshot }, events);
    });
  }

  async beginProbation(command: BeginProbationCommand): Promise<ExecutionResult<any>> {
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
        new EmployeeProbationStartedEvent(command.employeeId, command.tenantId),
        new EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
        new EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
      ];

      return new ExecutionResult({ employee, assignment, timeline, snapshot }, events);
    });
  }

  async confirmEmployee(command: ConfirmEmployeeCommand): Promise<ExecutionResult<any>> {
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
        new EmployeeConfirmedEvent(command.employeeId, command.tenantId),
        new EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
        new EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
      ];

      return new ExecutionResult({ employee, assignment, timeline, snapshot }, events);
    });
  }

  async transferEmployee(command: TransferEmployeeCommand): Promise<ExecutionResult<any>> {
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
        new EmployeeTransferredEvent(command.employeeId, command.tenantId, assignment.id),
        new EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
        new EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
      ];

      return new ExecutionResult({ employee, assignment, timeline, snapshot }, events);
    });
  }

  async promoteEmployee(command: PromoteEmployeeCommand): Promise<ExecutionResult<any>> {
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
        new EmployeePromotedEvent(command.employeeId, command.tenantId, assignment.positionId),
        new EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
        new EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
      ];

      return new ExecutionResult({ employee, assignment, timeline, snapshot }, events);
    });
  }

  async resignEmployee(command: ResignEmployeeCommand): Promise<ExecutionResult<any>> {
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
        new EmployeeResignedEvent(command.employeeId, command.tenantId, command.resignationDate),
        new EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
        new EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
      ];

      return new ExecutionResult({ employee, assignment, timeline, snapshot }, events);
    });
  }

  async terminateEmployee(command: TerminateEmployeeCommand): Promise<ExecutionResult<any>> {
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
        new EmployeeTerminatedEvent(command.employeeId, command.tenantId, command.terminationDate),
        new EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
        new EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
      ];

      return new ExecutionResult({ employee, assignment, timeline, snapshot }, events);
    });
  }

  async exitEmployee(command: ExitEmployeeCommand): Promise<ExecutionResult<any>> {
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
        new EmployeeExitedEvent(command.employeeId, command.tenantId, command.exitDate),
        new EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
        new EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
      ];

      return new ExecutionResult({ employee, assignment, timeline, snapshot }, events);
    });
  }

  async rehireEmployee(command: RehireEmployeeCommand): Promise<ExecutionResult<any>> {
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
        new EmployeeRehiredEvent(command.employeeId, command.tenantId),
        new EmployeeTimelineCreatedEvent(command.employeeId, command.tenantId),
        new EmployeeSnapshotCreatedEvent(command.employeeId, command.tenantId)
      ];

      return new ExecutionResult({ employee, assignment, timeline, snapshot }, events);
    });
  }
}
