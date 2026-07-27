import { PrismaService } from '../../../../common/prisma/prisma.service';
import { EventBusService } from '../../../../core/events/event-bus.service';
import { IExceptionDetector } from './exception-detector.interface';
import { AttendanceHealthService } from '../attendance-health.service';
export declare class OperationalExceptionOrchestrator {
    private readonly prisma;
    private readonly eventBus;
    private readonly healthService;
    private readonly detectors;
    private readonly logger;
    constructor(prisma: PrismaService, eventBus: EventBusService, healthService: AttendanceHealthService, detectors: IExceptionDetector[]);
    runDetection(musterId: string, correlationId: string): Promise<void>;
    resolveException(exceptionId: string, actorId: string, resolutionNotes: string, correlationId: string): Promise<{
        id: string;
        employeeId: string | null;
        createdAt: Date;
        status: import(".prisma/client").$Enums.AttendanceExceptionStatus;
        version: number;
        musterId: string;
        severity: import(".prisma/client").$Enums.AttendanceExceptionSeverity;
        attendanceDayId: string | null;
        exceptionType: import(".prisma/client").$Enums.AttendanceExceptionType;
        priority: number;
        description: string;
        recommendedAction: string | null;
        detectedBy: string;
        resolvedAt: Date | null;
        resolvedBy: string | null;
        resolutionNotes: string | null;
    }>;
    hasUnresolvedCriticalExceptions(musterId: string, prismaTx?: any): Promise<boolean>;
}
//# sourceMappingURL=operational-exception.orchestrator.d.ts.map