import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { AttendanceSummaryRepository } from '../repositories/attendance-summary.repository';

@Injectable()
export class AttendanceQueryService {
  private readonly logger = new Logger(AttendanceQueryService.name);
  
  constructor(
    private readonly prisma: PrismaService,
    private readonly summaryRepo: AttendanceSummaryRepository
  ) {}

  async getAttendanceSummary(employeeId: string, payrollPeriodId: string) {
    const summary = await this.summaryRepo.findLatestByEmployeeAndPeriod(employeeId, payrollPeriodId);
    if (!summary) {
      throw new NotFoundException(`No attendance summary found for employee ${employeeId} in period ${payrollPeriodId}`);
    }
    return summary;
  }

  async getAttendanceMetrics(employeeId: string, payrollPeriodId: string) {
    const summary = await this.getAttendanceSummary(employeeId, payrollPeriodId);
    return summary.attendanceMetrics;
  }

  async getAttendanceHours(employeeId: string, payrollPeriodId: string) {
    const summary = await this.getAttendanceSummary(employeeId, payrollPeriodId);
    return summary.timeMetrics;
  }

  async getLeaveSummary(employeeId: string, payrollPeriodId: string) {
    const summary = await this.getAttendanceSummary(employeeId, payrollPeriodId);
    return summary.leaveSummary;
  }

  async getProjectSummary(employeeId: string, payrollPeriodId: string) {
    const summary = await this.getAttendanceSummary(employeeId, payrollPeriodId);
    return summary.projectSiteSummary;
  }

  async getSiteSummary(employeeId: string, payrollPeriodId: string) {
    const summary = await this.getAttendanceSummary(employeeId, payrollPeriodId);
    return summary.projectSiteSummary; // Both are in the same object currently
  }

  // --- Legacy Methods for ESS Facades & Widgets ---
  async getTodaySummary(ctx: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.prisma.attendanceDay.findFirst({
      where: {
        employeeId: ctx.userId,
        muster: {
          musterDate: today
        }
      }
    });
  }

  async getHistory(ctx: any, limit: number = 10) {
    return this.prisma.attendanceDay.findMany({
      where: { employeeId: ctx.userId },
      orderBy: { muster: { musterDate: 'desc' } },
      take: limit
    });
  }
}
