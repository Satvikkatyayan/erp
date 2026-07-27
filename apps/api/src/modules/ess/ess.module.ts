import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { IntegrationModule } from '../../core/integration/integration.module';

// Import domain modules for query services
import { AttendanceModule } from '../attendance/attendance.module';
import { LeaveModule } from '../leave/leave.module';
import { PayrollModule } from '../payroll/payroll.module';
import { PerformanceModule } from '../performance/performance.module';
import { AssetsModule } from '../assets/assets.module';

// Facades
import { EmployeeFacade } from './facades/employee.facade';

// Services
import { EmployeeDashboardService } from './services/employee-dashboard.service';
import { EmployeeProfileService } from './services/employee-profile.service';
import { EmployeeDocumentService } from './services/employee-document.service';
import { EmployeeRequestService } from './services/employee-request.service';
import { EmployeePreferenceService } from './services/employee-preference.service';
import { EmployeeNotificationService } from './services/employee-notification.service';
import { EmployeeSessionService } from './services/employee-session.service';

// Events
import { EssEventPublisher } from './events/ess-event.publisher';

// Widgets
import { DashboardWidgetProvider } from './widgets/dashboard-widget.provider';
import { AttendanceWidget } from './widgets/attendance.widget';
import { LeaveWidget } from './widgets/leave.widget';
import { PayrollWidget } from './widgets/payroll.widget';
import { AssetWidget } from './widgets/asset.widget';

// Controllers
import { EssDashboardController } from './controllers/ess-dashboard.controller';
import { EssProfileController } from './controllers/ess-profile.controller';
import { EssRequestController } from './controllers/ess-request.controller';
import { EssDocumentController } from './controllers/ess-document.controller';
import { EssSessionController } from './controllers/ess-session.controller';

@Module({
  imports: [
    CoreModule, 
    PrismaModule, 
    IntegrationModule,
    AttendanceModule,
    LeaveModule,
    PayrollModule,
    PerformanceModule,
    AssetsModule
  ],
  controllers: [
    EssDashboardController,
    EssProfileController,
    EssRequestController,
    EssDocumentController,
    EssSessionController
  ],
  providers: [
    EmployeeFacade,
    EmployeeDashboardService,
    EmployeeProfileService,
    EmployeeDocumentService,
    EmployeeRequestService,
    EmployeePreferenceService,
    EmployeeNotificationService,
    EmployeeSessionService,
    EssEventPublisher,
    
    // Widgets
    DashboardWidgetProvider,
    AttendanceWidget,
    LeaveWidget,
    PayrollWidget,
    AssetWidget
  ],
  exports: [
    EmployeeFacade
  ]
})
export class EssModule {}
