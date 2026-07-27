import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class AssetRecoveryService {
  private readonly logger = new Logger(AssetRecoveryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async initiateRecovery(ctx: PlatformContext, assetId: string, employeeId: string, reason: string) {
    this.logger.log(`Initiating recovery for asset ${assetId}`);
    return this.prisma.assetRecovery.create({
      data: {
        tenantId: ctx.tenantId,
        assetId,
        employeeId,
        initiatedReason: reason,
      }
    });
  }
}
