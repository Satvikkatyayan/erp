import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  async assignShift(ctx: PlatformContext, employeeId: string, templateId: string, effectiveFrom: Date, effectiveTo?: Date) {
      return this.prisma.attShiftAssignment.create({
          data: {
              tenantId: ctx.tenantId,
              employeeId,
              shiftTemplateId: templateId,
              effectiveFrom,
              effectiveTo
          }
      });
  }
}
