import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class OrganizationQueryService {
  private readonly logger = new Logger(OrganizationQueryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getDepartments(ctx: PlatformContext) {
    return this.prisma.department.findMany({ where: { tenantId: ctx.tenantId } });
  }
}
