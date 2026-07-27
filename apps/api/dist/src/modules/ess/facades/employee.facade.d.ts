import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { AttendanceQueryService } from '../../attendance/services/attendance-query.service';
import { LeaveQueryService } from '../../leave/services/leave-query.service';
import { PayrollQueryService } from '../../payroll/services/payroll-query.service';
import { AssetQueryService } from '../../assets/services/asset-query.service';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmployeeFacade {
    private readonly prisma;
    private readonly attendanceQuery;
    private readonly leaveQuery;
    private readonly payrollQuery;
    private readonly assetQuery;
    private readonly logger;
    constructor(prisma: PrismaService, attendanceQuery: AttendanceQueryService, leaveQuery: LeaveQueryService, payrollQuery: PayrollQueryService, assetQuery: AssetQueryService);
    getEmployeeProfile(ctx: PlatformContext): Promise<{
        employeeId: string;
        employeeNumber: string;
        firstName: string;
        lastName: string;
        jobTitle: string;
    }>;
    getLeaveBalances(ctx: PlatformContext): Promise<({
        leaveType: {
            name: string;
            id: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
            version: number;
            deletedAt: Date | null;
            createdBy: string | null;
            updatedBy: string | null;
            isPaid: boolean;
        };
    } & {
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        leaveTypeId: string;
        year: number;
        totalDays: import("@prisma/client/runtime/library").Decimal;
        usedDays: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    getAttendanceHistory(ctx: PlatformContext): Promise<{
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        musterId: string;
        attendanceResult: import(".prisma/client").$Enums.AttendanceResult;
        shiftId: string | null;
        snapshottedDesignation: string | null;
        snapshottedDepartment: string | null;
        snapshottedReportingManager: string | null;
        workedHours: import("@prisma/client/runtime/library").Decimal;
        overtimeHours: import("@prisma/client/runtime/library").Decimal;
        lateMinutes: number;
        earlyExitMinutes: number;
        correctionStatus: import(".prisma/client").$Enums.AttendanceCorrectionStatus;
        validationStatus: import(".prisma/client").$Enums.AttendanceValidationStatus;
        lockStatus: import(".prisma/client").$Enums.AttendanceLockStatus;
    }[]>;
    getAssignedAssets(ctx: PlatformContext): Promise<({
        asset: {
            category: {
                name: string;
                id: string;
                tenantId: string;
                organizationId: string;
                description: string | null;
                isActive: boolean;
                code: string;
                assetType: string;
            };
        } & {
            name: string;
            id: string;
            tenantId: string;
            organizationId: string;
            createdAt: Date;
            status: string;
            description: string | null;
            categoryId: string;
            assetType: string;
            subCategoryId: string | null;
            locationId: string | null;
            vendorId: string | null;
            condition: string;
        };
    } & {
        id: string;
        employeeId: string;
        tenantId: string;
        status: string;
        remarks: string | null;
        assignedAt: Date;
        assetId: string;
        departmentId: string | null;
        assignedBy: string;
        expectedReturnDate: Date | null;
        returnedAt: Date | null;
        returnCondition: string | null;
    })[]>;
    getPayslips(ctx: PlatformContext): Promise<{
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        version: number;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        payrollCycleId: string;
        netPay: import("@prisma/client/runtime/library").Decimal;
    }[]>;
}
//# sourceMappingURL=employee.facade.d.ts.map