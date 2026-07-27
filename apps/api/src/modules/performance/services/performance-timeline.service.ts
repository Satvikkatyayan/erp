import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * Performance Timeline Service
 * 
 * Records lifecycle events in the PerfPerformanceTimeline table.
 * Provides a complete audit trail of all actions within a performance cycle.
 */
@Injectable()
export class PerformanceTimelineService {
  private readonly logger = new Logger(PerformanceTimelineService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Record a timeline event for a performance cycle/employee.
   */
  async recordEvent(
    ctx: any,
    cycleId: string | null,
    employeeId: string | null,
    eventType: string,
    eventData?: any,
  ): Promise<void> {
    await this.prisma.perfPerformanceTimeline.create({
      data: {
        tenantId: ctx.tenantId,
        cycleId,
        employeeId,
        eventType,
        eventData: eventData || {},
      },
    });

    this.logger.debug(`Timeline: ${eventType} for employee=${employeeId}, cycle=${cycleId}`);
  }
}
