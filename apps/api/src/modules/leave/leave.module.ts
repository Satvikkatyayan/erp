import { Module } from '@nestjs/common';
import { LeaveRequestRepository } from './repositories/leave-request.repository';
import { LeaveBalanceRepository } from './repositories/leave-balance.repository';
import { LeavePolicyRepository } from './repositories/leave-policy.repository';
import { LeaveTimelineRepository } from './repositories/timeline.repository';
import { LeaveSnapshotRepository } from './repositories/snapshot.repository';
import { LeaveExecutionService } from './services/leave-execution.service';

import { LeaveLifecycleController } from './controllers/leave-lifecycle.controller';
import { LeaveQueryController } from './controllers/leave-query.controller';

import { LeaveQueryService } from './services/leave-query.service';
import { PlatformLeaveSDK } from './sdk/platform-leave.sdk';

// Command Handlers
import { ApplyLeaveHandler } from './commands/handlers/apply-leave.handler';
import { ApproveLeaveHandler } from './commands/handlers/approve-leave.handler';
import { RejectLeaveHandler } from './commands/handlers/reject-leave.handler';
import { CancelLeaveHandler } from './commands/handlers/cancel-leave.handler';

// Query Handlers
import { GetLeaveRequestHandler } from './queries/handlers/get-leave-request.handler';
import { SearchLeaveRequestsHandler } from './queries/handlers/search-leave-requests.handler';
import { GetLeaveBalancesHandler } from './queries/handlers/get-leave-balances.handler';

import { LeaveMapper } from './api/mappers/leave.mapper';

@Module({
  imports: [],
  controllers: [
    LeaveLifecycleController,
    LeaveQueryController
  ],
  providers: [
    LeaveMapper,
    // Repositories
    LeaveRequestRepository,
    LeaveBalanceRepository,
    LeavePolicyRepository,
    LeaveTimelineRepository,
    LeaveSnapshotRepository,
    
    // Execution
    LeaveExecutionService,
    
    // Command Handlers
    ApplyLeaveHandler,
    ApproveLeaveHandler,
    RejectLeaveHandler,
    CancelLeaveHandler,
    
    // Queries
    LeaveQueryService,
    GetLeaveRequestHandler,
    SearchLeaveRequestsHandler,
    GetLeaveBalancesHandler,
    
    // SDK
    PlatformLeaveSDK,
  ],
  exports: [
    PlatformLeaveSDK
  ]
})
export class LeaveModule {}
