import { Global, Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { PolicyModule } from './policy/policy.module';
import { ScopeModule } from './scope/scope.module';
import { ApprovalModule } from './approval/approval.module';
import { AuditModule } from './audit/audit.module';
import { EventsModule } from './events/events.module';
import { FeatureFlagsModule } from './feature-flags/feature-flags.module';
import { CacheModule } from './cache/cache.module';
import { CommonModule } from './common/common.module';

import { SearchModule } from './search/search.module';
import { StorageModule } from './storage/storage.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { TemplatesModule } from './templates/templates.module';
import { RulesModule } from './rules/rules.module';
import { IntegrationModule } from './integration/integration.module';
import { FormsModule } from './forms/forms.module';
import { ReportsModule } from './reports/reports.module';
import { AiModule } from './ai/ai.module';
import { WorkflowModule } from './workflow/workflow.module';
import { CalendarModule } from './calendar/calendar.module';
import { ContextModule } from './context/context.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OutboxModule } from './outbox/outbox.module';
import { HealthModule } from './health/health.module';
import { PlatformSDK } from './sdk/platform.sdk';

@Global()
@Module({
  imports: [
    CalendarModule,
    WorkflowModule,
    AiModule,
    ReportsModule,
    FormsModule,
    IntegrationModule,
    RulesModule,
    TemplatesModule,
    SchedulerModule,
    StorageModule,
    SearchModule,
    AuthenticationModule,
    AuthorizationModule,
    PolicyModule,
    ScopeModule,
    ApprovalModule,
    AuditModule,
    EventsModule,
    FeatureFlagsModule,
    CacheModule,
    CommonModule,
    ContextModule,
    OutboxModule,
    HealthModule,
  ],
  providers: [
    PlatformSDK,
  ],
  exports: [
    CalendarModule,
    WorkflowModule,
    AiModule,
    ReportsModule,
    FormsModule,
    IntegrationModule,
    RulesModule,
    TemplatesModule,
    SchedulerModule,
    StorageModule,
    SearchModule,
    AuthenticationModule,
    AuthorizationModule,
    PolicyModule,
    ScopeModule,
    ApprovalModule,
    AuditModule,
    EventsModule,
    FeatureFlagsModule,
    CacheModule,
    CommonModule,
    ContextModule,
    OutboxModule,
    HealthModule,
    PlatformSDK,
  ],
})
export class CoreModule {}
