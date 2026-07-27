import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
export declare class HolidayConflictDetector implements IExceptionDetector {
    readonly identifier = "HolidayConflictDetector";
    detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]>;
}
//# sourceMappingURL=holiday-conflict.detector.d.ts.map