
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class LeaveCarryForwardService {
  constructor(private readonly prisma: PrismaService, private readonly sdk: PlatformSDK) {}

  async processYearEnd(ctx: PlatformContext, employeeId: string, leaveTypeId: string) {
      // Stub for processing carry forward
      await this.sdk.events.publish(ctx, 'LeaveCarryForwardCompleted', { employeeId, leaveTypeId });
  }
}
