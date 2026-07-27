import { Injectable } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class RecruitmentValidationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK
  ) {}

  async validateNewCandidate(ctx: PlatformContext, payload: any) {
    // Check for duplicates via Rules Engine
    const ruleResult = await this.sdk.rules.evaluate(ctx, 'CandidateDuplicateCheck', payload);
    if (ruleResult?.isDuplicate) {
       throw new Error('Duplicate candidate detected.');
    }
  }

  async validateHeadcount(ctx: PlatformContext, positionId: string) {
    const position = await this.prisma.recPosition.findUnique({
      where: { id: positionId }
    });
    if (position && position.filled >= position.approvedHeadcount) {
       throw new Error('Position headcount exceeded.');
    }
  }
}
