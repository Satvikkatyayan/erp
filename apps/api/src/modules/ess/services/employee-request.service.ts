import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class EmployeeRequestService {
  private readonly logger = new Logger(EmployeeRequestService.name);

  constructor(private readonly sdk: PlatformSDK) {}

  async submitLeaveRequest(ctx: PlatformContext, requestPayload: any) {
    return this.sdk.workflow.trigger(ctx, 'LEAVE_REQUEST');
  }

  async submitExpenseClaim(ctx: PlatformContext, claimPayload: any) {
    return this.sdk.workflow.trigger(ctx, 'EXPENSE_CLAIM');
  }
}
