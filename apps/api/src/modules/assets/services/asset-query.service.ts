import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class AssetQueryService {
  private readonly logger = new Logger(AssetQueryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getAssignedAssets(ctx: PlatformContext) {
    return this.prisma.assetAssignment.findMany({
      where: { employeeId: ctx.userId, returnedAt: null },
      include: {
        asset: {
          include: { category: true }
        }
      }
    });
  }
}
