import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { AssetTimelineService } from './asset-timeline.service';
import { AssignmentService } from './assignment.service';

@Injectable()
export class AssetOperationEngine {
  private readonly logger = new Logger(AssetOperationEngine.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly timeline: AssetTimelineService,
    private readonly assignmentService: AssignmentService,
    private readonly sdk: PlatformSDK,
  ) {}

  async executeTransition(
    ctx: PlatformContext, 
    assetId: string, 
    operation: 'Assign' | 'Return' | 'Transfer' | 'Maintenance' | 'Dispose', 
    payload: any, 
    actorId: string
  ) {
    this.logger.debug(`Executing ${operation} on asset ${assetId}`);
    
    // 1. Validation & Rule SDK Check
    const asset = await this.prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset) throw new BadRequestException('Asset not found');

    // 2. Workflow / Domain Service Execution
    let result;
    if (operation === 'Assign') {
      result = await this.assignmentService.assignAsset(ctx, assetId, payload.employeeId, actorId);
    } else if (operation === 'Return') {
      result = await this.assignmentService.returnAsset(ctx, payload.assignmentId, payload.employeeId, payload.condition, actorId);
    } else {
       // Mock for other operations
       result = { success: true, operation };
    }

    // 3. Timeline
    await this.timeline.logEvent(ctx, assetId, `Asset${operation}ed`, payload, actorId);

    // 4. Snapshot
    await this.createSnapshot(ctx, assetId, operation.toUpperCase(), result);

    // 5. Events
    await this.sdk.events.publish(ctx, `Asset${operation}ed`, { assetId, result });

    return result;
  }

  async createSnapshot(ctx: PlatformContext, assetId: string, snapshotType: string, resultData: any) {
    const asset = await this.prisma.asset.findUnique({ 
        where: { id: assetId },
        include: { configurations: true, identifiers: true }
    });
    if (!asset) return;
    
    await this.prisma.assetSnapshot.create({
      data: {
        tenantId: ctx.tenantId,
        assetId,
        snapshotType,
        assetData: asset,
        assignmentData: resultData,
      }
    });
  }
}
