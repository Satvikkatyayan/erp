import { Module } from '@nestjs/common';
import { DatabaseSecretProvider } from './secrets/database-secret.provider';
import { ConnectorRegistry } from './connectors/connector-registry';
import { RESTConnector } from './connectors/rest.connector';
import { DefaultTemplateEngine } from './mapping/transformation.engine';
import { OutboundIntegrationPipeline } from './pipeline/outbound-pipeline';
import { WebhookVerifier } from './webhooks/webhook-verifier';
import { PlatformIntegrationSDK } from './sdk/platform-integration.sdk';

@Module({
  providers: [
    DatabaseSecretProvider,
    ConnectorRegistry,
    RESTConnector,
    DefaultTemplateEngine,
    OutboundIntegrationPipeline,
    WebhookVerifier,
    PlatformIntegrationSDK
  ],
  exports: [PlatformIntegrationSDK]
})
export class IntegrationModule {}
