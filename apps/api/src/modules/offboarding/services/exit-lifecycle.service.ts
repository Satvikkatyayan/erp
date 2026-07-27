import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { ExitOperationEngine } from '../engines/exit-operation.engine';
import { ExitTimelineService } from './exit-timeline.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class ExitLifecycleService {
  private readonly logger = new Logger(ExitLifecycleService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly engine: ExitOperationEngine,
    private readonly timeline: ExitTimelineService,
    private readonly sdk: PlatformSDK
  ) {}

  async startExit(ctx: PlatformContext, employeeId: string, policyId: string, reasonId: string) {
    const request = await this.prisma.exitRequest.create({
      data: {
        tenantId: ctx.tenantId,
        employeeId,
        policyId,
        reasonId,
        status: 'SUBMITTED',
        requestedLwd: new Date()
      }
    });

    await this.timeline.logEvent(request.id, 'ExitRequested', ctx.employeeId, 'Employee submitted exit request');
    await this.sdk.events.publish(ctx, 'ExitRequested', { requestId: request.id, employeeId });

    return request;
  }

  async archiveEmployee(ctx: PlatformContext, requestId: string) {
    const request = await this.prisma.exitRequest.findUnique({
      where: { id: requestId },
      include: { employee: true }
    });

    if (!request) throw new Error('Request not found');

    // Archive the employee
    await this.prisma.empEmployee.update({
      where: { id: request.employeeId },
      data: { status: 'ARCHIVED' }
    });

    // Update request state
    await this.prisma.exitRequest.update({
      where: { id: requestId },
      data: { status: 'ARCHIVED' }
    });

    await this.timeline.logEvent(request.id, 'EmployeeArchived', ctx.employeeId, 'Employee successfully archived');
    await this.sdk.events.publish(ctx, 'EmployeeArchived', { requestId, employeeId: request.employeeId });
  }
}
