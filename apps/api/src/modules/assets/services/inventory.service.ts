import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async issueConsumable(ctx: PlatformContext, consumableId: string, employeeId: string, quantity: number, issuedBy: string) {
    this.logger.log(`Issuing ${quantity} of consumable ${consumableId}`);
    return this.prisma.assetConsumableIssue.create({
      data: {
        tenantId: ctx.tenantId,
        consumableId,
        employeeId,
        quantity,
        issuedBy,
      }
    });
  }
}
