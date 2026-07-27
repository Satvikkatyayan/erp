import { PlatformContext } from '../../../core/contracts/context/platform-context';

export class SubmitPayrollReviewApprovalCommand {
  constructor(
    public readonly ctx: PlatformContext,
    public readonly runId: string,
    public readonly reviewId: string,
    public readonly remarks?: string
  ) {}
}
