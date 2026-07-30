"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationModule = void 0;
const common_1 = require("@nestjs/common");
const communication_constants_1 = require("./config/communication.constants");
const communication_lifecycle_controller_1 = require("./controllers/communication-lifecycle.controller");
const communication_query_controller_1 = require("./controllers/communication-query.controller");
const dispatch_communication_handler_1 = require("./commands/handlers/dispatch-communication.handler");
const get_communication_history_handler_1 = require("./queries/handlers/get-communication-history.handler");
const communication_execution_service_1 = require("./services/communication-execution.service");
const communication_query_service_1 = require("./services/communication-query.service");
const communication_history_repository_1 = require("./repositories/communication-history.repository");
const communication_timeline_repository_1 = require("./repositories/communication-timeline.repository");
const platform_communication_sdk_1 = require("./sdk/platform-communication.sdk");
const communication_mapper_1 = require("./api/mappers/communication.mapper");
const cqrs_1 = require("@nestjs/cqrs");
const observability_module_1 = require("./observability/observability.module");
const resilience_module_1 = require("./resilience/resilience.module");
const routing_module_1 = require("./routing/routing.module");
const scheduling_module_1 = require("./scheduling/scheduling.module");
const workflow_module_1 = require("./workflow/workflow.module");
const approval_module_1 = require("./approval/approval.module");
const template_management_controller_1 = require("./controllers/template-management.controller");
const template_query_controller_1 = require("./controllers/template-query.controller");
const template_render_controller_1 = require("./controllers/template-render.controller");
const create_template_handler_1 = require("./commands/handlers/create-template.handler");
const publish_template_handler_1 = require("./commands/handlers/publish-template.handler");
const resolve_template_handler_1 = require("./queries/handlers/resolve-template.handler");
const get_templates_handler_1 = require("./queries/handlers/get-templates.handler");
const render_template_handler_1 = require("./queries/handlers/render-template.handler");
const template_command_service_1 = require("./services/template-command.service");
const template_query_service_1 = require("./services/template-query.service");
const template_rendering_service_1 = require("./services/template-rendering.service");
const communication_template_repository_1 = require("./repositories/communication-template.repository");
const template_mapper_1 = require("./api/mappers/template.mapper");
const render_mapper_1 = require("./api/mappers/render.mapper");
const provider_registry_1 = require("./registry/provider.registry");
const provider_resolver_1 = require("./resolver/provider.resolver");
const provider_factory_1 = require("./factory/provider.factory");
const get_registered_providers_handler_1 = require("./queries/handlers/get-registered-providers.handler");
const provider_query_controller_1 = require("./controllers/provider-query.controller");
const provider_mapper_1 = require("./api/mappers/provider.mapper");
const delivery_controller_1 = require("./api/controllers/delivery.controller");
const delivery_service_1 = require("./services/delivery.service");
const smtp_provider_1 = require("./providers/smtp.provider");
const ses_provider_1 = require("./providers/ses.provider");
const twilio_provider_1 = require("./providers/twilio.provider");
const MockCommunicationProvider = {
    send: async (payload) => {
        console.log('[CommunicationProvider] Mock send execution', payload);
    },
};
let CommunicationModule = class CommunicationModule {
};
exports.CommunicationModule = CommunicationModule;
exports.CommunicationModule = CommunicationModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, observability_module_1.ObservabilityModule, resilience_module_1.ResilienceModule, routing_module_1.RoutingModule, scheduling_module_1.SchedulingModule, workflow_module_1.WorkflowModule, approval_module_1.ApprovalModule],
        controllers: [
            communication_lifecycle_controller_1.CommunicationLifecycleController,
            communication_query_controller_1.CommunicationQueryController,
            template_management_controller_1.TemplateManagementController,
            template_query_controller_1.TemplateQueryController,
            template_render_controller_1.TemplateRenderController,
            provider_query_controller_1.ProviderQueryController,
            delivery_controller_1.DeliveryController,
        ],
        providers: [
            {
                provide: communication_constants_1.COMMUNICATION_PROVIDER_TOKEN,
                useValue: MockCommunicationProvider,
            },
            communication_mapper_1.CommunicationMapper,
            communication_history_repository_1.CommunicationHistoryRepository,
            communication_timeline_repository_1.CommunicationTimelineRepository,
            communication_execution_service_1.CommunicationExecutionService,
            communication_query_service_1.CommunicationQueryService,
            dispatch_communication_handler_1.DispatchCommunicationHandler,
            get_communication_history_handler_1.GetCommunicationHistoryHandler,
            platform_communication_sdk_1.PlatformCommunicationSDK,
            template_mapper_1.TemplateMapper,
            render_mapper_1.RenderMapper,
            communication_template_repository_1.CommunicationTemplateRepository,
            template_command_service_1.TemplateCommandService,
            template_query_service_1.TemplateQueryService,
            template_rendering_service_1.TemplateRenderingService,
            create_template_handler_1.CreateTemplateHandler,
            publish_template_handler_1.PublishTemplateHandler,
            resolve_template_handler_1.ResolveTemplateHandler,
            get_templates_handler_1.GetTemplatesHandler,
            render_template_handler_1.RenderTemplateHandler,
            {
                provide: 'ProviderRegistryInterface',
                useClass: provider_registry_1.ProviderRegistry,
            },
            provider_resolver_1.ProviderResolver,
            provider_factory_1.ProviderFactory,
            get_registered_providers_handler_1.GetRegisteredProvidersHandler,
            provider_mapper_1.ProviderMapper,
            {
                provide: 'DeliveryServiceInterface',
                useClass: delivery_service_1.DeliveryService,
            },
            {
                provide: smtp_provider_1.SmtpProvider,
                useFactory: () => new smtp_provider_1.SmtpProvider({
                    host: process.env.SMTP_HOST || 'localhost',
                    port: parseInt(process.env.SMTP_PORT || '587', 10),
                    secure: false,
                    authUser: process.env.SMTP_USER || 'admin',
                    authPass: process.env.SMTP_PASS || 'pass'
                }),
            },
            {
                provide: ses_provider_1.SesProvider,
                useFactory: () => new ses_provider_1.SesProvider({
                    region: process.env.AWS_REGION || 'us-east-1',
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy'
                }),
            },
            {
                provide: twilio_provider_1.TwilioProvider,
                useFactory: () => new twilio_provider_1.TwilioProvider({
                    accountSid: process.env.TWILIO_ACCOUNT_SID || 'dummy',
                    authToken: process.env.TWILIO_AUTH_TOKEN || 'dummy',
                    fromNumber: process.env.TWILIO_FROM_NUMBER || '+1234567890'
                }),
            },
        ],
        exports: [platform_communication_sdk_1.PlatformCommunicationSDK],
    })
], CommunicationModule);
//# sourceMappingURL=communication.module.js.map