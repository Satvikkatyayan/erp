import { Module } from '@nestjs/common';

import { COMMUNICATION_PROVIDER_TOKEN } from './config/communication.constants';
import { CommunicationLifecycleController } from './controllers/communication-lifecycle.controller';
import { CommunicationQueryController } from './controllers/communication-query.controller';
import { DispatchCommunicationHandler } from './commands/handlers/dispatch-communication.handler';
import { GetCommunicationHistoryHandler } from './queries/handlers/get-communication-history.handler';
import { CommunicationExecutionService } from './services/communication-execution.service';
import { CommunicationQueryService } from './services/communication-query.service';
import { CommunicationHistoryRepository } from './repositories/communication-history.repository';
import { CommunicationTimelineRepository } from './repositories/communication-timeline.repository';
import { PlatformCommunicationSDK } from './sdk/platform-communication.sdk';
import { CommunicationMapper } from './api/mappers/communication.mapper';
import { CqrsModule } from '@nestjs/cqrs';

import { ObservabilityModule } from './observability/observability.module';
import { ResilienceModule } from './resilience/resilience.module';
import { RoutingModule } from './routing/routing.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { WorkflowModule } from './workflow/workflow.module';
import { ApprovalModule } from './approval/approval.module';

import { TemplateManagementController } from './controllers/template-management.controller';
import { TemplateQueryController } from './controllers/template-query.controller';
import { TemplateRenderController } from './controllers/template-render.controller';
import { CreateTemplateHandler } from './commands/handlers/create-template.handler';
import { PublishTemplateHandler } from './commands/handlers/publish-template.handler';
import { ResolveTemplateHandler } from './queries/handlers/resolve-template.handler';
import { GetTemplatesHandler } from './queries/handlers/get-templates.handler';
import { RenderTemplateHandler } from './queries/handlers/render-template.handler';
import { TemplateCommandService } from './services/template-command.service';
import { TemplateQueryService } from './services/template-query.service';
import { TemplateRenderingService } from './services/template-rendering.service';
import { CommunicationTemplateRepository } from './repositories/communication-template.repository';
import { TemplateMapper } from './api/mappers/template.mapper';
import { RenderMapper } from './api/mappers/render.mapper';

import { ProviderRegistry } from './registry/provider.registry';
import { ProviderResolver } from './resolver/provider.resolver';
import { ProviderFactory } from './factory/provider.factory';
import { GetRegisteredProvidersHandler } from './queries/handlers/get-registered-providers.handler';
import { ProviderQueryController } from './controllers/provider-query.controller';
import { ProviderMapper } from './api/mappers/provider.mapper';

import { DeliveryController } from './api/controllers/delivery.controller';
import { DeliveryService } from './services/delivery.service';

import { SmtpProvider } from './providers/smtp.provider';
import { SesProvider } from './providers/ses.provider';
import { TwilioProvider } from './providers/twilio.provider';

// For Foundation Milestone, we provide a mock/logger provider.
const MockCommunicationProvider = {
  send: async (payload: any) => {
    console.log('[CommunicationProvider] Mock send execution', payload);
  },
};

@Module({
  imports: [CqrsModule, ObservabilityModule, ResilienceModule, RoutingModule, SchedulingModule, WorkflowModule, ApprovalModule],
  controllers: [
    CommunicationLifecycleController,
    CommunicationQueryController,
    TemplateManagementController,
    TemplateQueryController,
    TemplateRenderController,
    ProviderQueryController,
    DeliveryController,
  ],
  providers: [
    {
      provide: COMMUNICATION_PROVIDER_TOKEN,
      useValue: MockCommunicationProvider,
    },
    CommunicationMapper,
    CommunicationHistoryRepository,
    CommunicationTimelineRepository,
    CommunicationExecutionService,
    CommunicationQueryService,
    DispatchCommunicationHandler,
    GetCommunicationHistoryHandler,
    PlatformCommunicationSDK,
    TemplateMapper,
    RenderMapper,
    CommunicationTemplateRepository,
    TemplateCommandService,
    TemplateQueryService,
    TemplateRenderingService,
    CreateTemplateHandler,
    PublishTemplateHandler,
    ResolveTemplateHandler,
    GetTemplatesHandler,
    RenderTemplateHandler,
    {
      provide: 'ProviderRegistryInterface',
      useClass: ProviderRegistry,
    },
    ProviderResolver,
    ProviderFactory,
    GetRegisteredProvidersHandler,
    ProviderMapper,
    {
      provide: 'DeliveryServiceInterface',
      useClass: DeliveryService,
    },
    {
      provide: SmtpProvider,
      useFactory: () => new SmtpProvider({
        host: process.env.SMTP_HOST || 'localhost',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: false,
        authUser: process.env.SMTP_USER || 'admin',
        authPass: process.env.SMTP_PASS || 'pass'
      }),
    },
    {
      provide: SesProvider,
      useFactory: () => new SesProvider({
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy'
      }),
    },
    {
      provide: TwilioProvider,
      useFactory: () => new TwilioProvider({
        accountSid: process.env.TWILIO_ACCOUNT_SID || 'dummy',
        authToken: process.env.TWILIO_AUTH_TOKEN || 'dummy',
        fromNumber: process.env.TWILIO_FROM_NUMBER || '+1234567890'
      }),
    },
  ],
  exports: [PlatformCommunicationSDK],
})
export class CommunicationModule {}
