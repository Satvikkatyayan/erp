import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';
import { PrismaService } from '../../../../common/prisma/prisma.service';
export interface ExceptionDetectionResult {
    exceptionType: AttendanceExceptionType;
    severity: AttendanceExceptionSeverity;
    priority: number;
    description: string;
    recommendedAction?: string;
    attendanceDayId?: string;
    employeeId?: string;
}
export interface IExceptionDetector {
    readonly identifier: string;
    detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]>;
}
//# sourceMappingURL=exception-detector.interface.d.ts.map