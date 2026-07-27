import { Injectable } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class InterviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK
  ) {}

  async submitFeedback(ctx: PlatformContext, interviewId: string, formPayload: any) {
    const formResult = await this.sdk.forms.submit(ctx, formPayload);
    
    await this.prisma.recInterviewFeedback.create({
      data: {
        interviewId,
        interviewerId: ctx.userId,
        formInstanceId: formResult.id,
        recommendation: formPayload.recommendation || 'HIRE'
      }
    });
  }
}
