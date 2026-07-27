import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EventBusService } from '../../../core/events/event-bus.service';
import { AttendanceSummaryRepository } from '../repositories/attendance-summary.repository';
import { AttendanceResult, AttendanceExceptionSeverity, AttendanceExceptionStatus, MusterWorkflowStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

export interface TimeMetrics {
  workedHours: number;
  grossWorkedHours: number;
  netWorkedHours: number;
  breakDuration: number;
  lateMinutes: number;
  earlyExitMinutes: number;
  overtimeHours: number;
  nightShiftHours: number;
  weekendHours: number;
  holidayHours: number;
  shiftCompliancePercentage: number;
}

export interface AttendanceMetrics {
  presentDays: number;
  absentDays: number;
  halfDays: number;
  paidLeaveDays: number;
  casualLeaveDays: number;
  compOffDays: number;
  trainingDays: number;
  businessTravelDays: number;
  holidayDays: number;
  weeklyOffDays: number;
  attendancePercentage: number;
  attendanceWeight: number;
}

export interface ExceptionMetrics {
  criticalExceptions: number;
  highPriorityExceptions: number;
  mediumPriorityExceptions: number;
  lowPriorityExceptions: number;
  resolvedExceptions: number;
  outstandingExceptions: number;
  reviewCompletionPercentage: number;
}

export interface LeaveSummary {
  approvedLeave: number;
  pendingLeave: number;
  rejectedLeave: number;
  leaveBalanceUsed: number;
  leaveTypes: Record<string, number>;
  leaveDuration: number;
}

export interface ProjectSiteSummary {
  workedSites: string[];
  workedProjects: string[];
  workedCostCenters: string[];
  daysPerSite: Record<string, number>;
  daysPerProject: Record<string, number>;
  hoursPerSite: Record<string, number>;
  hoursPerProject: Record<string, number>;
}

export interface AttendanceCalculationResult {
  employeeId: string;
  payrollPeriodId: string;
  version: number;
  generatedAt: Date;
  generatedById?: string;
  sourceMusterIds: string[];
  timeMetrics: TimeMetrics;
  attendanceMetrics: AttendanceMetrics;
  exceptionMetrics: ExceptionMetrics;
  leaveSummary: LeaveSummary;
  projectSiteSummary: ProjectSiteSummary;
  checksum: string;
}

@Injectable()
export class AttendanceCalculationService {
  private readonly logger = new Logger(AttendanceCalculationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService,
    private readonly summaryRepo: AttendanceSummaryRepository
  ) {}

  async calculateSummary(employeeId: string, payrollPeriodId: string, generatedById?: string, tx?: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<AttendanceCalculationResult> {
    const client = tx || this.prisma;
    const period = await client.payPayrollPeriod.findUniqueOrThrow({ where: { id: payrollPeriodId } });

    // Fetch all days in period
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

    const timeMetrics: TimeMetrics = {
      workedHours: 0, grossWorkedHours: 0, netWorkedHours: 0, breakDuration: 0,
      lateMinutes: 0, earlyExitMinutes: 0, overtimeHours: 0, nightShiftHours: 0,
      weekendHours: 0, holidayHours: 0, shiftCompliancePercentage: 100
    };

    const attendanceMetrics: AttendanceMetrics = {
      presentDays: 0, absentDays: 0, halfDays: 0, paidLeaveDays: 0, casualLeaveDays: 0,
      compOffDays: 0, trainingDays: 0, businessTravelDays: 0, holidayDays: 0, weeklyOffDays: 0,
      attendancePercentage: 0, attendanceWeight: 0
    };

    const exceptionMetrics: ExceptionMetrics = {
      criticalExceptions: 0, highPriorityExceptions: 0, mediumPriorityExceptions: 0, lowPriorityExceptions: 0,
      resolvedExceptions: 0, outstandingExceptions: 0, reviewCompletionPercentage: 100
    };

    const leaveSummary: LeaveSummary = {
      approvedLeave: 0, pendingLeave: 0, rejectedLeave: 0, leaveBalanceUsed: 0, leaveTypes: {}, leaveDuration: 0
    };

    const projectSiteSummary: ProjectSiteSummary = {
      workedSites: [], workedProjects: [], workedCostCenters: [],
      daysPerSite: {}, daysPerProject: {}, hoursPerSite: {}, hoursPerProject: {}
    };

    const sourceMusterIds = new Set<string>();

    for (const day of attendanceDays) {
      sourceMusterIds.add(day.musterId);
      
      timeMetrics.workedHours += Number(day.workedHours);
      timeMetrics.overtimeHours += Number(day.overtimeHours);
      timeMetrics.lateMinutes += day.lateMinutes;
      timeMetrics.earlyExitMinutes += day.earlyExitMinutes;

      switch(day.attendanceResult) {
        case 'PRESENT': attendanceMetrics.presentDays++; break;
        case 'ABSENT': attendanceMetrics.absentDays++; break;
        case 'HALF_DAY': attendanceMetrics.halfDays++; break;
        case 'PAID_LEAVE': attendanceMetrics.paidLeaveDays++; leaveSummary.approvedLeave++; break;
        case 'CASUAL_LEAVE': attendanceMetrics.casualLeaveDays++; leaveSummary.approvedLeave++; break;
        case 'HOLIDAY': attendanceMetrics.holidayDays++; break;
        case 'WEEKLY_OFF': attendanceMetrics.weeklyOffDays++; break;
      }

      if (!projectSiteSummary.workedSites.includes(day.muster.siteId)) projectSiteSummary.workedSites.push(day.muster.siteId);
      if (!projectSiteSummary.workedProjects.includes(day.muster.projectId)) projectSiteSummary.workedProjects.push(day.muster.projectId);

      projectSiteSummary.daysPerSite[day.muster.siteId] = (projectSiteSummary.daysPerSite[day.muster.siteId] || 0) + 1;
      projectSiteSummary.daysPerProject[day.muster.projectId] = (projectSiteSummary.daysPerProject[day.muster.projectId] || 0) + 1;
      projectSiteSummary.hoursPerSite[day.muster.siteId] = (projectSiteSummary.hoursPerSite[day.muster.siteId] || 0) + Number(day.workedHours);
      projectSiteSummary.hoursPerProject[day.muster.projectId] = (projectSiteSummary.hoursPerProject[day.muster.projectId] || 0) + Number(day.workedHours);

      // Exceptions
      for (const exc of day.muster.exceptions.filter(e => e.employeeId === employeeId)) {
        if (exc.severity === 'CRITICAL') exceptionMetrics.criticalExceptions++;
        else if (exc.severity === 'HIGH') exceptionMetrics.highPriorityExceptions++;
        else if (exc.severity === 'MEDIUM') exceptionMetrics.mediumPriorityExceptions++;
        else exceptionMetrics.lowPriorityExceptions++;

        if (exc.status === 'RESOLVED' || exc.status === 'DISMISSED') exceptionMetrics.resolvedExceptions++;
        else exceptionMetrics.outstandingExceptions++;
      }
    }

    const expectedWorkingDays = attendanceMetrics.presentDays + attendanceMetrics.absentDays + attendanceMetrics.halfDays;
    if (expectedWorkingDays > 0) {
      attendanceMetrics.attendancePercentage = Number(((attendanceMetrics.presentDays + (attendanceMetrics.halfDays * 0.5)) / expectedWorkingDays * 100).toFixed(2));
    }

    const payloadHashSource = JSON.stringify({ employeeId, payrollPeriodId, timeMetrics, attendanceMetrics });
    const checksum = crypto.createHash('sha256').update(payloadHashSource).digest('hex');

    const result: AttendanceCalculationResult = {
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

  async generateAndPersistSummary(employeeId: string, payrollPeriodId: string, generatedById?: string, tx?: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>) {
    const result = await this.calculateSummary(employeeId, payrollPeriodId, generatedById, tx);

    // Get previous max version
    const prev = await this.summaryRepo.findLatestByEmployeeAndPeriod(employeeId, payrollPeriodId, tx);

    const version = prev ? prev.version + 1 : 1;
    result.version = version;

    const summary = await this.summaryRepo.save({
        employeeId: result.employeeId,
        payrollPeriodId: result.payrollPeriodId,
        version: result.version,
        generatedAt: result.generatedAt,
        generatedById: result.generatedById,
        timeMetrics: result.timeMetrics as any,
        attendanceMetrics: result.attendanceMetrics as any,
        exceptionMetrics: result.exceptionMetrics as any,
        leaveSummary: result.leaveSummary as any,
        projectSiteSummary: result.projectSiteSummary as any,
        sourceMusterIds: result.sourceMusterIds,
        checksum: result.checksum
    }, tx);
    const eventName = version === 1 ? 'AttendanceSummaryGenerated' : 'AttendanceSummaryRegenerated';
    await this.eventBus.publish({
      eventId: uuidv4(),
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
      eventId: uuidv4(),
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
}
