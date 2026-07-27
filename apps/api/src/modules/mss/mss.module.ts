import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { EmployeeModule } from '../employee/employee.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { LeaveModule } from '../leave/leave.module';
import { AssetsModule } from '../assets/assets.module';
import { PerformanceModule } from '../performance/performance.module';
import { CoreModule } from '../../core/core.module';

import { ManagerFacade } from './facades/manager.facade';
import { ApprovalFacade } from './facades/approval.facade';
import { TeamScopeResolver } from './resolvers/team-scope.resolver';
import { DashboardWidgetRegistry } from './widgets/dashboard-widget.registry';

import { ManagerDashboardService } from './services/manager-dashboard.service';
import { ManagerTeamService } from './services/manager-team.service';
import { ManagerApprovalService } from './services/manager-approval.service';
import { ManagerDelegationService } from './services/manager-delegation.service';
import { ManagerPreferenceService } from './services/manager-preference.service';

import { MssDashboardController } from './controllers/mss-dashboard.controller';
import { MssTeamController } from './controllers/mss-team.controller';
import { MssApprovalController } from './controllers/mss-approval.controller';
import { MssDelegationController } from './controllers/mss-delegation.controller';
import { MssPreferenceController } from './controllers/mss-preference.controller';

import { TeamSummaryWidget } from './widgets/team-summary.widget';
import { ManagerApprovalWidget } from './widgets/manager-approval.widget';

import { MssEventListener } from './events/mss-event.listener';
import { MssEventPublisher } from './events/mss-event.publisher';

@Module({
  imports: [
    PrismaModule,
    EmployeeModule,
    AttendanceModule,
    LeaveModule,
    AssetsModule,
    PerformanceModule,
    CoreModule,
  ],
  controllers: [
    MssDashboardController,
    MssTeamController,
    MssApprovalController,
    MssDelegationController,
    MssPreferenceController,
  ],
  providers: [
    ManagerFacade,
    ApprovalFacade,
    TeamScopeResolver,
    DashboardWidgetRegistry,
    ManagerDashboardService,
    ManagerTeamService,
    ManagerApprovalService,
    ManagerDelegationService,
    ManagerPreferenceService,
    TeamSummaryWidget,
    ManagerApprovalWidget,
    MssEventListener,
    MssEventPublisher,
  ],
  exports: [
    ManagerFacade
  ]
})
export class MssModule {}
