import { GenerateAttendanceSummaryCommand } from '../generate-attendance-summary.command';
import { AttendanceCalculationService } from '../../services/attendance-calculation.service';
import { PrismaService } from '../../../../common/prisma/prisma.service';
export declare class GenerateAttendanceSummaryHandler {
    private readonly calculationService;
    private readonly prisma;
    constructor(calculationService: AttendanceCalculationService, prisma: PrismaService);
    execute(command: GenerateAttendanceSummaryCommand): Promise<any>;
}
//# sourceMappingURL=generate-attendance-summary.handler.d.ts.map