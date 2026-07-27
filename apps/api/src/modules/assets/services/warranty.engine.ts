import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class WarrantyEngine {
  private readonly logger = new Logger(WarrantyEngine.name);
  constructor(private readonly prisma: PrismaService) {}

  async addWarrantyContract(ctx: PlatformContext, assetId: string, contractType: string, effectiveFrom: Date, effectiveTo: Date) {
    this.logger.log(`Adding ${contractType} warranty for ${assetId}`);
    return this.prisma.assetWarrantyContract.create({
      data: {
        tenantId: ctx.tenantId,
        assetId,
        contractType,
        effectiveFrom,
        effectiveTo,
      }
    });
  }
}
