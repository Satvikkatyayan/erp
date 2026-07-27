import { Injectable, Inject, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { EventBusService } from '../../../../core/events/event-bus.service';
import { IExceptionDetector } from './exception-detector.interface';
import { AttendanceExceptionStatus, AttendanceExceptionSeverity } from '@prisma/client';
import { AttendanceExceptionEvent } from '../../events/attendance-exception.events';
import { AttendanceHealthService } from '../attendance-health.service';

@Injectable()
export class OperationalExceptionOrchestrator {
  private readonly logger = new Logger(OperationalExceptionOrchestrator.name);
  
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService,
    private readonly healthService: AttendanceHealthService,
    @Inject('EXCEPTION_DETECTORS') private readonly detectors: IExceptionDetector[]
  ) {}

  async runDetection(musterId: string, correlationId: string) {
    return this.prisma.$transaction(async (tx) => {
      this.logger.log(`Running operational exception detection for Muster ${musterId}`);
      
      const allResults = [];
      for (const detector of this.detectors) {
        try {
          const results = await detector.detect(musterId, tx);
          results.forEach(r => allResults.push({ ...r, detectedBy: detector.identifier }));
        } catch (error: any) {
          this.logger.error(`Detector ${detector.identifier} failed: ${error.message}`);
        }
      }

      if (allResults.length === 0) return;

      // Filter out existing open exceptions of the same type/employee combo to prevent duplicates
      const existingExceptions = await tx.attendanceException.findMany({
        where: { musterId, status: { notIn: [AttendanceExceptionStatus.RESOLVED, AttendanceExceptionStatus.DISMISSED] } }
      });

      const newExceptionsData = allResults.filter(result => {
        const isDuplicate = existingExceptions.some(e => 
          e.exceptionType === result.exceptionType && 
          e.employeeId === result.employeeId
        );
        return !isDuplicate;
      });

      if (newExceptionsData.length === 0) return;

      // Persist new exceptions
      const createdExceptions = await Promise.all(
        newExceptionsData.map(data => 
          tx.attendanceException.create({
            data: {
              musterId,
              attendanceDayId: data.attendanceDayId,
              employeeId: data.employeeId,
              exceptionType: data.exceptionType,
              severity: data.severity,
              priority: data.priority,
              description: data.description,
              recommendedAction: data.recommendedAction,
              detectedBy: data.detectedBy,
              status: AttendanceExceptionStatus.OPEN
            }
          })
        )
      );

      // Record Timelines and Publish Events
      for (const exc of createdExceptions) {
        await tx.musterTimeline.create({
          data: {
            musterId,
            action: 'ExceptionDetected',
            timestamp: new Date(),
            reason: exc.description,
            severity: exc.severity,
            currentState: AttendanceExceptionStatus.OPEN,
            version: 1
          }
        });

        this.eventBus.publish(new AttendanceExceptionEvent(
          'AttendanceExceptionDetected',
          correlationId,
          {
            exceptionId: exc.id,
            musterId: exc.musterId,
            type: exc.exceptionType,
            severity: exc.severity
          }
        ));
      }

      // Trigger health metric update
      await this.healthService.updateMusterHealth(musterId, correlationId, tx);
    });
  }

  async resolveException(exceptionId: string, actorId: string, resolutionNotes: string, correlationId: string) {
    return this.prisma.$transaction(async (tx) => {
      const exc = await tx.attendanceException.findUnique({ where: { id: exceptionId } });
      if (!exc) throw new Error("Exception not found");

      if (exc.status === AttendanceExceptionStatus.RESOLVED) return exc;

      const updated = await tx.attendanceException.update({
        where: { id: exceptionId },
        data: {
          status: AttendanceExceptionStatus.RESOLVED,
          resolvedAt: new Date(),
          resolvedBy: actorId,
          resolutionNotes
        }
      });

      await tx.musterTimeline.create({
        data: {
          musterId: exc.musterId,
          action: 'ExceptionResolved',
          actorId,
          timestamp: new Date(),
          reason: resolutionNotes,
          severity: exc.severity,
          previousState: exc.status,
          currentState: AttendanceExceptionStatus.RESOLVED,
          version: 1
        }
      });

      this.eventBus.publish(new AttendanceExceptionEvent(
        'AttendanceExceptionResolved',
        correlationId,
        {
          exceptionId: exc.id,
          musterId: exc.musterId,
          type: exc.exceptionType,
          severity: exc.severity,
          actorId
        }
      ));

      await this.healthService.updateMusterHealth(exc.musterId, correlationId, tx);

      return updated;
    });
  }

  async hasUnresolvedCriticalExceptions(musterId: string, prismaTx?: any): Promise<boolean> {
    const db = prismaTx || this.prisma;
    const count = await db.attendanceException.count({
      where: {
        musterId,
        severity: AttendanceExceptionSeverity.CRITICAL,
        status: { notIn: [AttendanceExceptionStatus.RESOLVED, AttendanceExceptionStatus.DISMISSED] }
      }
    });
    return count > 0;
  }
}
