import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class EmployeeNumberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK
  ) {}

  async generate(ctx: PlatformContext, policyName: string): Promise<string> {
    // 1. Fetch formatting rule from Platform Rules SDK
    const rule = await this.sdk.rules.evaluate(ctx, policyName, {});
    const prefix = rule.prefix || 'EMP';
    
    // 2. Concurrency-safe sequence generation
    // Dummy generation for v1
    const count = await this.prisma.empEmployee.count({ where: { tenantId: ctx.tenantId } });
    return `${prefix}-${(count + 1).toString().padStart(4, '0')}`;
  }
}
