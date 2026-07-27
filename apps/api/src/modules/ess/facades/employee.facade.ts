import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { AttendanceQueryService } from '../../attendance/services/attendance-query.service';
import { LeaveQueryService } from '../../leave/services/leave-query.service';
import { PayrollQueryService } from '../../payroll/services/payroll-query.service';
import { AssetQueryService } from '../../assets/services/asset-query.service';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class EmployeeFacade {
  private readonly logger = new Logger(EmployeeFacade.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly attendanceQuery: AttendanceQueryService,
    private readonly leaveQuery: LeaveQueryService,
    private readonly payrollQuery: PayrollQueryService,
    private readonly assetQuery: AssetQueryService
  ) {}

  async getEmployeeProfile(ctx: PlatformContext) {
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

  async getLeaveBalances(ctx: PlatformContext) {
    return this.leaveQuery.getLeaveBalances(ctx);
  }

  async getAttendanceHistory(ctx: PlatformContext) {
    return this.attendanceQuery.getHistory(ctx);
  }

  async getAssignedAssets(ctx: PlatformContext) {
    return this.assetQuery.getAssignedAssets(ctx);
  }

  async getPayslips(ctx: PlatformContext) {
    return this.payrollQuery.getPayslips(ctx);
  }
}
