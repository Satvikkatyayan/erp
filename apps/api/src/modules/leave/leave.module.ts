import { LeaveQueryService } from './services/leave-query.service';

import { Module } from '@nestjs/common';
import { LeaveLifecycleService } from './services/leave-lifecycle.service';
import { LeaveBalanceService } from './services/leave-balance.service';
import { LeavePolicyService } from './services/leave-policy.service';
import { LeaveCarryForwardService } from './services/leave-carry-forward.service';

@Module({
  providers: [
    LeaveQueryService,
    LeaveLifecycleService,
    LeaveBalanceService,
    LeavePolicyService,
    LeaveCarryForwardService
  ],
  exports: [
    LeaveQueryService,
    LeaveLifecycleService,
    LeaveBalanceService,
    LeavePolicyService,
    LeaveCarryForwardService
  ]
})
export class LeaveModule {}
