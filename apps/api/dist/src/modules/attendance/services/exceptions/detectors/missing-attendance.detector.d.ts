import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
export declare class MissingAttendanceDetector implements IExceptionDetector {
    readonly identifier = "MissingAttendanceDetector";
    detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]>;
}
//# sourceMappingURL=missing-attendance.detector.d.ts.map