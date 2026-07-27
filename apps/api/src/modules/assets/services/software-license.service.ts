import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class SoftwareLicenseService {
  private readonly logger = new Logger(SoftwareLicenseService.name);
  constructor(private readonly prisma: PrismaService) {}

  async allocateSeat(ctx: PlatformContext, poolId: string, employeeId: string) {
    const pool = await this.prisma.softwareLicensePool.findUnique({ where: { id: poolId } });
    if (!pool || pool.allocatedSeats >= pool.totalSeats) {
        throw new BadRequestException('No seats available in pool');
    }

    const assignment = await this.prisma.softwareSeatAssignment.create({
      data: {
        tenantId: ctx.tenantId,
        poolId,
        employeeId,
      }
    });

    await this.prisma.softwareLicensePool.update({
      where: { id: poolId },
      data: { allocatedSeats: { increment: 1 } }
    });
    
    return assignment;
  }
}
