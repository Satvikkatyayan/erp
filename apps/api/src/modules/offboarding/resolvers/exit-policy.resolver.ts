import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class ExitPolicyResolver {
  constructor(private readonly prisma: PrismaService) {}

  async resolvePolicy(ctx: PlatformContext, policyId: string) {
    return this.prisma.exitPolicy.findUnique({ where: { id: policyId } });
  }
}
