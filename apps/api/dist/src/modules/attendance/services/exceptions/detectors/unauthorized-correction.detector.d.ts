import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
export declare class UnauthorizedCorrectionDetector implements IExceptionDetector {
    readonly identifier = "UnauthorizedCorrectionDetector";
    detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]>;
}
//# sourceMappingURL=unauthorized-correction.detector.d.ts.map