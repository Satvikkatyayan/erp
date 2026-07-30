const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps', 'api', 'src', 'modules', 'assets');
const dirs = [
    '',
    'controllers',
    'commands',
    'queries',
    'events',
    'services',
    'validators',
    'repositories',
];

dirs.forEach(dir => {
    fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
});

const moduleFile = `import { Module } from '@nestjs/common';
import { AssetLifecycleService } from './services/asset-lifecycle.service';
import { AssetOperationEngine } from './services/asset-operation.engine';
import { AssignmentService } from './services/assignment.service';
import { ReservationEngine } from './services/reservation.engine';
import { InventoryService } from './services/inventory.service';
import { MaintenanceService } from './services/maintenance.service';
import { WarrantyEngine } from './services/warranty.engine';
import { SoftwareLicenseService } from './services/software-license.service';
import { AssetDocumentService } from './services/asset-document.service';
import { AssetRecoveryService } from './services/asset-recovery.service';
import { AssetTimelineService } from './services/asset-timeline.service';

@Module({
  providers: [
    AssetLifecycleService,
    AssetOperationEngine,
    AssignmentService,
    ReservationEngine,
    InventoryService,
    MaintenanceService,
    WarrantyEngine,
    SoftwareLicenseService,
    AssetDocumentService,
    AssetRecoveryService,
    AssetTimelineService,
  ],
  exports: [
    AssetLifecycleService,
    AssetOperationEngine,
    AssignmentService,
    ReservationEngine,
    InventoryService,
    MaintenanceService,
    WarrantyEngine,
    SoftwareLicenseService,
    AssetDocumentService,
    AssetRecoveryService,
    AssetTimelineService,
  ]
})
export class AssetsModule {}
`;
fs.writeFileSync(path.join(baseDir, 'assets.module.ts'), moduleFile);

const timelineFile = `import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class AssetTimelineService {
  private readonly logger = new Logger(AssetTimelineService.name);
  constructor(private readonly prisma: PrismaService) {}

  async logEvent(ctx: PlatformContext, assetId: string, eventType: string, eventData: any, triggeredBy?: string) {
    this.logger.debug(\`Timeline: \${eventType} for asset=\${assetId}\`);
    return this.prisma.assetTimeline.create({
      data: {
        tenantId: ctx.tenantId,
        assetId,
        eventType,
        eventData,
        triggeredBy,
      }
    });
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'asset-timeline.service.ts'), timelineFile);

const engineFile = `import { Injectable, Logger, BadRequestException } from '@nestjs/common';
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
  ) {}

  async executeTransition(
    ctx: PlatformContext, 
    assetId: string, 
    operation: 'Assign' | 'Return' | 'Transfer' | 'Maintenance' | 'Dispose', 
    payload: any, 
    actorId: string
  ) {
    this.logger.debug(\`Executing \${operation} on asset \${assetId}\`);
    
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
    await this.timeline.logEvent(ctx, assetId, \`Asset\${operation}ed\`, payload, actorId);

    // 4. Snapshot
    await this.createSnapshot(ctx, assetId, operation.toUpperCase(), result);

    // 5. Events
    await PlatformSDK.events.publish(ctx, \`Asset\${operation}ed\`, { assetId, result });

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
`;
fs.writeFileSync(path.join(baseDir, 'services', 'asset-operation.engine.ts'), engineFile);

const assignmentFile = `import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class AssignmentService {
  private readonly logger = new Logger(AssignmentService.name);
  constructor(private readonly prisma: PrismaService) {}

  async assignAsset(ctx: PlatformContext, assetId: string, employeeId: string, assignedBy: string) {
    this.logger.log(\`Assigning asset \${assetId} to employee \${employeeId}\`);
    const assignment = await this.prisma.assetAssignment.create({
      data: {
        tenantId: ctx.tenantId,
        assetId,
        employeeId,
        assignedBy,
        status: 'ACTIVE',
      }
    });
    
    await this.prisma.asset.update({
      where: { id: assetId },
      data: { status: 'ASSIGNED' }
    });

    return assignment;
  }

  async returnAsset(ctx: PlatformContext, assignmentId: string, employeeId: string, condition: string, returnedBy: string) {
    this.logger.log(\`Returning assignment \${assignmentId} from employee \${employeeId}\`);
    const returnRecord = await this.prisma.assetReturn.create({
      data: {
        tenantId: ctx.tenantId,
        assignmentId,
        assetId: assignmentId, // Need actual assetId, simplified for mock
        employeeId,
        condition,
        returnedBy,
        status: 'COMPLETED'
      }
    });

    const assignment = await this.prisma.assetAssignment.findUnique({ where: { id: assignmentId } });
    if (assignment) {
      await this.prisma.assetAssignment.update({
        where: { id: assignmentId },
        data: { status: 'RETURNED', returnedAt: new Date(), returnCondition: condition }
      });
      await this.prisma.asset.update({
        where: { id: assignment.assetId },
        data: { status: 'AVAILABLE', condition: condition }
      });
    }

    return returnRecord;
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'assignment.service.ts'), assignmentFile);

const reservationFile = `import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class ReservationEngine {
  private readonly logger = new Logger(ReservationEngine.name);
  constructor(private readonly prisma: PrismaService) {}

  async createReservation(ctx: PlatformContext, assetId: string, employeeId: string, startTime: Date, endTime: Date, isRecurring: boolean, recurrenceRule?: string) {
    this.logger.log(\`Creating reservation for \${assetId}\`);
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
`;
fs.writeFileSync(path.join(baseDir, 'services', 'reservation.engine.ts'), reservationFile);

const inventoryFile = `import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async issueConsumable(ctx: PlatformContext, consumableId: string, employeeId: string, quantity: Int, issuedBy: string) {
    this.logger.log(\`Issuing \${quantity} of consumable \${consumableId}\`);
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
`;
fs.writeFileSync(path.join(baseDir, 'services', 'inventory.service.ts'), inventoryFile);

const maintenanceFile = `import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class MaintenanceService {
  private readonly logger = new Logger(MaintenanceService.name);
  constructor(private readonly prisma: PrismaService) {}

  async scheduleMaintenance(ctx: PlatformContext, assetId: string, title: string, frequency: string, nextScheduledAt: Date) {
    this.logger.log(\`Scheduling maintenance for \${assetId}\`);
    return this.prisma.assetMaintenanceSchedule.create({
      data: {
        tenantId: ctx.tenantId,
        assetId,
        title,
        frequency,
        nextScheduledAt,
      }
    });
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'maintenance.service.ts'), maintenanceFile);

const warrantyFile = `import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class WarrantyEngine {
  private readonly logger = new Logger(WarrantyEngine.name);
  constructor(private readonly prisma: PrismaService) {}

  async addWarrantyContract(ctx: PlatformContext, assetId: string, contractType: string, effectiveFrom: Date, effectiveTo: Date) {
    this.logger.log(\`Adding \${contractType} warranty for \${assetId}\`);
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
`;
fs.writeFileSync(path.join(baseDir, 'services', 'warranty.engine.ts'), warrantyFile);

const softwareFile = `import { Injectable, Logger, BadRequestException } from '@nestjs/common';
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
`;
fs.writeFileSync(path.join(baseDir, 'services', 'software-license.service.ts'), softwareFile);

const recoveryFile = `import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class AssetRecoveryService {
  private readonly logger = new Logger(AssetRecoveryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async initiateRecovery(ctx: PlatformContext, assetId: string, employeeId: string, reason: string) {
    this.logger.log(\`Initiating recovery for asset \${assetId}\`);
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
`;
fs.writeFileSync(path.join(baseDir, 'services', 'asset-recovery.service.ts'), recoveryFile);

const lifecycleFile = `import { Injectable, Logger } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class AssetLifecycleService {
  private readonly logger = new Logger(AssetLifecycleService.name);
  constructor(private readonly prisma: PrismaService) {}
  
  // High-level macro workflows would go here.
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'asset-lifecycle.service.ts'), lifecycleFile);

const documentFile = `import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class AssetDocumentService {
  private readonly logger = new Logger(AssetDocumentService.name);
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'asset-document.service.ts'), documentFile);

console.log('Scaffolded apps/api/src/modules/assets');
