import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
export declare class DuplicatePunchDetector implements IExceptionDetector {
    readonly identifier = "DuplicatePunchDetector";
    detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]>;
}
//# sourceMappingURL=duplicate-punch.detector.d.ts.map