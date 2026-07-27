import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class ClearanceMatrixEngine {
  constructor(private readonly prisma: PrismaService) {}

  async generateClearanceTasks(ctx: PlatformContext, requestId: string, templateId: string) {
    const template = await this.prisma.exitClearanceTemplate.findUnique({ where: { id: templateId }});
    if (!template) return;

    await this.prisma.exitClearance.create({
      data: {
        requestId,
        departmentId: template.departmentId || 'HR',
        status: 'PENDING',
        tasks: template.tasks as any
      }
    });
  }
}
