import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class ReservationEngine {
  private readonly logger = new Logger(ReservationEngine.name);
  constructor(private readonly prisma: PrismaService) {}

  async createReservation(ctx: PlatformContext, assetId: string, employeeId: string, startTime: Date, endTime: Date, isRecurring: boolean, recurrenceRule?: string) {
    this.logger.log(`Creating reservation for ${assetId}`);
    return this.prisma.assetReservation.create({
      data: {
        tenantId: ctx.tenantId,
        assetId,
        employeeId,
        startTime,
        endTime,
        isRecurring,
        recurrenceRule,
        status: 'APPROVED',
      }
    });
  }
}
