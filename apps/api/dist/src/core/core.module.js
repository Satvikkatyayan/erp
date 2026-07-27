"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const authentication_module_1 = require("./authentication/authentication.module");
const authorization_module_1 = require("./authorization/authorization.module");
const policy_module_1 = require("./policy/policy.module");
const scope_module_1 = require("./scope/scope.module");
const approval_module_1 = require("./approval/approval.module");
const audit_module_1 = require("./audit/audit.module");
const events_module_1 = require("./events/events.module");
const feature_flags_module_1 = require("./feature-flags/feature-flags.module");
const cache_module_1 = require("./cache/cache.module");
const common_module_1 = require("./common/common.module");
const search_module_1 = require("./search/search.module");
const storage_module_1 = require("./storage/storage.module");
const scheduler_module_1 = require("./scheduler/scheduler.module");
const templates_module_1 = require("./templates/templates.module");
const rules_module_1 = require("./rules/rules.module");
const integration_module_1 = require("./integration/integration.module");
const forms_module_1 = require("./forms/forms.module");
const reports_module_1 = require("./reports/reports.module");
const ai_module_1 = require("./ai/ai.module");
const workflow_module_1 = require("./workflow/workflow.module");
const calendar_module_1 = require("./calendar/calendar.module");
const context_module_1 = require("./context/context.module");
const outbox_module_1 = require("./outbox/outbox.module");
const health_module_1 = require("./health/health.module");
const platform_sdk_1 = require("./sdk/platform.sdk");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            calendar_module_1.CalendarModule,
            workflow_module_1.WorkflowModule,
            ai_module_1.AiModule,
            reports_module_1.ReportsModule,
            forms_module_1.FormsModule,
            integration_module_1.IntegrationModule,
            rules_module_1.RulesModule,
            templates_module_1.TemplatesModule,
            scheduler_module_1.SchedulerModule,
            storage_module_1.StorageModule,
            search_module_1.SearchModule,
            authentication_module_1.AuthenticationModule,
            authorization_module_1.AuthorizationModule,
            policy_module_1.PolicyModule,
            scope_module_1.ScopeModule,
            approval_module_1.ApprovalModule,
            audit_module_1.AuditModule,
            events_module_1.EventsModule,
            feature_flags_module_1.FeatureFlagsModule,
            cache_module_1.CacheModule,
            common_module_1.CommonModule,
            context_module_1.ContextModule,
            outbox_module_1.OutboxModule,
            health_module_1.HealthModule,
        ],
        providers: [
            platform_sdk_1.PlatformSDK,
        ],
        exports: [
            calendar_module_1.CalendarModule,
            workflow_module_1.WorkflowModule,
            ai_module_1.AiModule,
            reports_module_1.ReportsModule,
            forms_module_1.FormsModule,
            integration_module_1.IntegrationModule,
            rules_module_1.RulesModule,
            templates_module_1.TemplatesModule,
            scheduler_module_1.SchedulerModule,
            storage_module_1.StorageModule,
            search_module_1.SearchModule,
            authentication_module_1.AuthenticationModule,
            authorization_module_1.AuthorizationModule,
            policy_module_1.PolicyModule,
            scope_module_1.ScopeModule,
            approval_module_1.ApprovalModule,
            audit_module_1.AuditModule,
            events_module_1.EventsModule,
            feature_flags_module_1.FeatureFlagsModule,
            cache_module_1.CacheModule,
            common_module_1.CommonModule,
            context_module_1.ContextModule,
            outbox_module_1.OutboxModule,
            health_module_1.HealthModule,
            platform_sdk_1.PlatformSDK,
        ],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map