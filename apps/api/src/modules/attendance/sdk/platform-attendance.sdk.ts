import { Injectable } from '@nestjs/common';
import { AttendanceQueryService } from '../services/attendance-query.service';
import { TimeMetrics, AttendanceMetrics, LeaveSummary, ProjectSiteSummary, AttendanceCalculationResult } from '../services/attendance-calculation.service';

/**
 * Platform SDK boundary for Attendance.
 * Ensures external modules (like Payroll) can access operational metrics
 * immutably without querying Attendance tables directly.
 * 
 * This SDK is strictly READ-ONLY and solely uses the Query Layer.
 */
@Injectable()
export class PlatformAttendanceSDK {
  constructor(private readonly queryService: AttendanceQueryService) {}

  async getAttendanceSummary(employeeId: string, payrollPeriodId: string): Promise<AttendanceCalculationResult> {
    const summary = await this.queryService.getAttendanceSummary(employeeId, payrollPeriodId);
    
    return {
      employeeId: summary.employeeId,
      payrollPeriodId: summary.payrollPeriodId,
      version: summary.version,
      generatedAt: summary.generatedAt,
      generatedById: summary.generatedById || undefined,
      sourceMusterIds: summary.sourceMusterIds,
      timeMetrics: summary.timeMetrics as unknown as TimeMetrics,
      attendanceMetrics: summary.attendanceMetrics as unknown as AttendanceMetrics,
      exceptionMetrics: summary.exceptionMetrics as any,
      leaveSummary: summary.leaveSummary as unknown as LeaveSummary,
      projectSiteSummary: summary.projectSiteSummary as unknown as ProjectSiteSummary,
      checksum: summary.checksum || ''
    };
  }

  async getAttendanceMetrics(employeeId: string, payrollPeriodId: string): Promise<AttendanceMetrics> {
    return (await this.queryService.getAttendanceMetrics(employeeId, payrollPeriodId)) as unknown as AttendanceMetrics;
  }

  async getAttendanceHours(employeeId: string, payrollPeriodId: string): Promise<TimeMetrics> {
    return (await this.queryService.getAttendanceHours(employeeId, payrollPeriodId)) as unknown as TimeMetrics;
  }

  async getAttendanceLeaveSummary(employeeId: string, payrollPeriodId: string): Promise<LeaveSummary> {
    return (await this.queryService.getLeaveSummary(employeeId, payrollPeriodId)) as unknown as LeaveSummary;
  }

  async getAttendanceProjectSummary(employeeId: string, payrollPeriodId: string): Promise<ProjectSiteSummary> {
    return (await this.queryService.getProjectSummary(employeeId, payrollPeriodId)) as unknown as ProjectSiteSummary;
  }
}
