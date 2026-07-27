import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { AttendanceSnapshotService } from '../services/attendance-snapshot.service';
import { AttendanceInitializationService } from '../services/attendance-initialization.service';
import { EventBusService } from '../../../core/events/event-bus.service';
import { DailyMusterCreatedEvent, AttendanceSnapshotCreatedEvent } from '../events/attendance.events';
import { MusterWorkflowStatus } from '@prisma/client';

export class CreateDailySiteMusterCommand {
  constructor(
    public readonly siteId: string,
    public readonly projectId: string,
    public readonly musterDate: Date,
    public readonly siteClerkId: string,
    public readonly tenantId: string = 'SYSTEM',
    public readonly organizationId: string = 'SYSTEM',
    public readonly correlationId: string = require('uuid').v4(),
    public readonly shiftId?: string,
  ) {}
}

@Injectable()
export class CreateDailySiteMusterCommandHandler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly snapshotService: AttendanceSnapshotService,
    private readonly initService: AttendanceInitializationService,
    private readonly eventBus: EventBusService,
  ) {}

  async execute(command: CreateDailySiteMusterCommand) {
    const { siteId, projectId, musterDate, siteClerkId, shiftId } = command;

    // Reject future locked payroll periods (Mock check for domain integrity)
    if (musterDate.getTime() > new Date().getTime() + 86400000) {
      throw new BadRequestException('Cannot create muster for future dates.');
    }

    // Execute in a single transaction
    return this.prisma.$transaction(async (tx) => {
      // 1. Ensure no Muster already exists for this Site + Date
      const existingMuster = await tx.dailySiteMuster.findFirst({
        where: {
          siteId,
          musterDate: {
            gte: new Date(new Date(musterDate).setHours(0,0,0,0)),
            lt: new Date(new Date(musterDate).setHours(23,59,59,999)),
          }
        }
      });

      if (existingMuster) {
        throw new BadRequestException('Daily Site Muster already exists for this site and date.');
      }

      // 2. Create the shell Muster (Draft)
      const muster = await tx.dailySiteMuster.create({
        data: {
          siteId,
          projectId,
          musterDate: new Date(musterDate),
          shiftId,
          siteClerkId,
          workflowStatus: MusterWorkflowStatus.DRAFT
        }
      });

      // 3. Invoke AttendanceSnapshotService
      const snapshot = await this.snapshotService.createSnapshot(
        muster.id,
        siteId,
        projectId,
        musterDate,
        tx
      );

      // Link snapshot back to muster
      await tx.dailySiteMuster.update({
        where: { id: muster.id },
        data: { snapshotId: snapshot.id }
      });

      // 4. Invoke AttendanceInitializationService (Generates days, updates KPIs)
      const initializedMuster = await this.initService.initializeAggregate(
        muster.id,
        snapshot.snapshotData as any,
        shiftId || null,
        tx
      );

      // 5. Create initial Timeline entry
      await tx.musterTimeline.create({
        data: {
          musterId: muster.id,
          action: 'MUSTER_CREATED',
          actorId: siteClerkId,
          timestamp: new Date()
        }
      });

      // 6. Publish Domain Events
      this.eventBus.publish(new AttendanceSnapshotCreatedEvent(
        command.correlationId,
        {
          snapshotId: snapshot.id,
          musterId: muster.id,
          siteId,
          employeeCount: (snapshot.snapshotData as any[]).length
        }
      ));

      this.eventBus.publish(new DailyMusterCreatedEvent(
        command.correlationId,
        {
          musterId: muster.id,
          siteId,
          date: muster.musterDate,
          createdBy: siteClerkId
        }
      ));

      return initializedMuster;
    });
  }
}
