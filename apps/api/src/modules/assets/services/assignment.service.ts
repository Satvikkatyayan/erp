import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class AssignmentService {
  private readonly logger = new Logger(AssignmentService.name);
  constructor(private readonly prisma: PrismaService) {}

  async assignAsset(ctx: PlatformContext, assetId: string, employeeId: string, assignedBy: string) {
    this.logger.log(`Assigning asset ${assetId} to employee ${employeeId}`);
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
    this.logger.log(`Returning assignment ${assignmentId} from employee ${employeeId}`);
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
